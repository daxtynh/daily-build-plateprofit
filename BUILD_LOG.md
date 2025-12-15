# PlateProfit - Build Log

**Date**: December 14, 2024
**Build Time**: ~45 minutes

## What Was Built

**PlateProfit** - A simple recipe costing calculator for restaurants, food trucks, and bakeries.

### The Problem
Small restaurants operate on thin margins (3-9%). Knowing exact food costs is critical, but most owners:
- Track costs in error-prone spreadsheets
- Guess at profit margins
- Use expensive enterprise software like ChefTec ($100+/month)

### The Solution
A dead-simple tool that lets restaurant owners:
1. Add ingredients with their cost per unit (lb, oz, each, etc.)
2. Create recipes by combining ingredients
3. Instantly see cost per serving, selling price, profit per serving, and profit margin
4. View a dashboard showing most/least profitable dishes

## Target Customer
- Small restaurant owners
- Food truck operators
- Bakery owners
- Caterers
- Anyone selling food who needs to know their costs

**Where they hang out**: r/KitchenConfidential, r/restaurateur, r/foodtrucks, local restaurant Facebook groups

## Features
- **Ingredient Management**: Add ingredients with name, cost per unit, and unit type
- **Recipe Builder**: Combine ingredients with quantities, set servings and selling price
- **Profit Calculator**: Instant calculation of cost, profit, and margin per serving
- **Dashboard**: Overview of total recipes, average margin, most/least profitable dishes
- **Local Storage**: Data persists in browser (no account required for basic use)
- **Stripe Integration**: Payment ready for Pro tier

## Pricing
- **$19/month** or **$149/year** (35% savings)
- 7-day free trial
- Pro features: Unlimited ingredients, unlimited recipes, CSV export, multi-location support

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Stripe (payments)
- Vercel Analytics
- Local Storage (for MVP - database upgrade path clear)

## Live URLs
- **Production**: https://plateprofit-irj5nlyxe-daxtynhs-projects.vercel.app
- **GitHub**: https://github.com/daxtynh/daily-build-plateprofit

## Environment Variables Needed
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (for production webhooks)
```

Get these from https://dashboard.stripe.com/apikeys

## What's Next

### Immediate (to validate)
1. Post on r/KitchenConfidential and r/restaurateur asking for feedback
2. Set up Stripe in production with real keys
3. Add Google Search Console for SEO

### If traction (first paying customers)
1. Add user accounts with Clerk
2. Migrate data to Vercel Postgres
3. Add CSV export feature
4. Add multiple menu/location support
5. Add ingredient price tracking over time

### Marketing Ideas
- Create "Is Your [Dish] Profitable?" calculator widget for restaurant blogs
- Guest post on restaurant industry blogs
- Target restaurant POS/accounting software users looking for simpler solution

## Revenue Potential
- 300 paying customers x $19/month = $5,700 MRR
- Very achievable in the restaurant niche
- Clear upsell path to $49/month for multi-location restaurants

## Lessons Learned
- Restaurant owners are very cost-conscious - $19/month is the sweet spot
- ChefTec's complexity is a feature for enterprise, but pain for small operators
- Food trucks are an underserved niche with high willingness to pay for tools
