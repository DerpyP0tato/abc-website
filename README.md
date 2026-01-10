# Asian Business Collective Website

A modern, maintainable website for the Asian Business Collective student organization at Binghamton University, built with Next.js and Sanity CMS.

## Features

- **Content Management**: Non-technical admins can create and edit events and team members through Sanity Studio
- **Dynamic Event Pages**: Each event automatically generates its own webpage from CMS content
- **Conditional Rendering**: Optional fields (like signup links) are only displayed when provided
- **Responsive Design**: Mobile-first design that works on all devices
- **Server Components**: Optimized performance using Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity account (free at sanity.io)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Sanity project:
   ```bash
   npm create sanity@latest -- --template clean --create-project "ABC Website" --dataset production
   ```

4. Copy `.env.local.example` to `.env.local` and add your Sanity project ID and dataset:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser
7. Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── team/              # Team page
│   ├── events/            # Events list and detail pages
│   ├── contact/           # Contact page
│   └── studio/            # Sanity Studio (admin panel)
├── components/            # Reusable React components
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/      # Content schemas (event, teamMember)
│   ├── lib/              # Sanity client and queries
│   └── structure.ts      # Studio desk structure
└── sanity.config.ts      # Sanity Studio configuration
```

## Content Management

### Accessing Sanity Studio

1. Navigate to `/studio` on your deployed site or `http://localhost:3000/studio` locally
2. Sign in with your Sanity account

### Creating Events

1. Go to Events in the sidebar
2. Click "Create" and select "Event"
3. Fill in required fields:
   - Title (auto-generates URL slug)
   - Start Date & Time
   - Location
   - Description
   - Category
4. Optional fields:
   - End Date & Time
   - Cover Image
   - Signup URL (Google Forms link)
   - Custom signup button text
   - Featured (checkbox to highlight on home page)
5. Click "Publish"

The event will automatically appear on the Events page and have its own detail page at `/events/[slug]`

### Managing Team Members

1. Go to Team Members in the sidebar
2. Click "Create" and select "Team Member"
3. Fill in all fields:
   - Name
   - Role
   - LinkedIn URL
   - Headshot (square image, 600x600+ recommended)
   - Display Order (lower numbers appear first)
4. Click "Publish"

### Studio Organization

Events are organized into views:
- **Upcoming Events**: Events with future start dates
- **Past Events**: Events that have already occurred
- **Featured Events**: Events marked as featured
- **All Events**: Complete list

## Deployment

This site is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

## Maintenance Notes

- **Data Source**: All events and team members come from Sanity CMS - never hard-code this content
- **Revalidation**: Pages revalidate every 60 seconds to show fresh content
- **Conditional Fields**: The UI automatically hides optional fields when not provided
- **For Future Leaders**: Everything is managed through Sanity Studio at `/studio` - no code changes needed for content updates

## Support

For questions or issues, contact the development team or refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
# abc-website
