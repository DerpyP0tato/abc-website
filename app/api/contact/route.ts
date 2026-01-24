import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (resets on server restart)
// For production, consider using Redis or a database
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // 3 requests per minute

function getRateLimitKey(request: NextRequest): string {
    // Use X-Forwarded-For header or IP address for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    return ip
}

function checkRateLimit(key: string): boolean {
    const now = Date.now()
    const rateLimitData = rateLimitMap.get(key)

    if (!rateLimitData || now > rateLimitData.resetTime) {
        // Reset or initialize rate limit
        rateLimitMap.set(key, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        })
        return true
    }

    if (rateLimitData.count >= MAX_REQUESTS) {
        return false // Rate limit exceeded
    }

    rateLimitData.count++
    return true
}

// Validate email format
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Sanitize string inputs
function sanitizeString(input: string, maxLength: number = 1000): string {
    return input.trim().slice(0, maxLength)
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting check
        const rateLimitKey = getRateLimitKey(request)
        if (!checkRateLimit(rateLimitKey)) {
            return NextResponse.json(
                { success: false, message: 'Too many requests. Please try again later.' },
                { status: 429 }
            )
        }

        // Parse request body
        const body = await request.json()
        const { name, email, inquiryType, message, botcheck } = body

        // Honeypot check
        if (botcheck) {
            return NextResponse.json(
                { success: false, message: 'Invalid submission.' },
                { status: 400 }
            )
        }

        // Validate required fields
        if (!name || !email || !inquiryType || !message) {
            return NextResponse.json(
                { success: false, message: 'All fields are required.' },
                { status: 400 }
            )
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email address.' },
                { status: 400 }
            )
        }

        // Validate inquiry type
        const validInquiryTypes = ['general', 'membership', 'events', 'partnership']
        if (!validInquiryTypes.includes(inquiryType)) {
            return NextResponse.json(
                { success: false, message: 'Invalid inquiry type.' },
                { status: 400 }
            )
        }

        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeString(name, 100),
            email: sanitizeString(email, 100),
            inquiryType: sanitizeString(inquiryType, 50),
            message: sanitizeString(message, 5000),
        }

        // Validate lengths
        if (sanitizedData.name.length < 2) {
            return NextResponse.json(
                { success: false, message: 'Name must be at least 2 characters.' },
                { status: 400 }
            )
        }

        if (sanitizedData.message.length < 10) {
            return NextResponse.json(
                { success: false, message: 'Message must be at least 10 characters.' },
                { status: 400 }
            )
        }

        // Forward to Web3Forms
        const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'ABC Website/1.0',
            },
            body: JSON.stringify({
                access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                name: sanitizedData.name,
                email: sanitizedData.email,
                subject: `New Inquiry: ${sanitizedData.inquiryType}`,
                message: sanitizedData.message,
                from_name: 'ABC Website',
            }),
        })

        const responseText = await web3formsResponse.text()
        console.log('Web3Forms response status:', web3formsResponse.status)
        console.log('Web3Forms response body:', responseText)

        let result
        try {
            result = JSON.parse(responseText)
        } catch (e) {
            console.error('Failed to parse Web3Forms response as JSON:', e)
            throw new Error(`Web3Forms API returned invalid JSON (Status ${web3formsResponse.status}): ${responseText.slice(0, 100)}...`)
        }

        if (result.success) {
            return NextResponse.json(
                { success: true, message: 'Message sent successfully!' },
                { status: 200 }
            )
        } else {
            console.error('Web3Forms error:', result)
            return NextResponse.json(
                { success: false, message: 'Failed to send message. Please try again.' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Contact form error:', error)
        const errorMessage = error instanceof Error ? error.message : String(error)
        return NextResponse.json(
            { success: false, message: `Server Error: ${errorMessage}` },
            { status: 500 }
        )
    }
}
