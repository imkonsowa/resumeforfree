# Sidebar Debug

The issue: Content is BEHIND the sidebar instead of NEXT to it.

## Expected Structure:
```
SidebarProvider (flex container)
├── Sidebar (peer)
│   ├── Spacer div (w-[--sidebar-width] = 16rem)
│   └── Fixed sidebar (position: fixed, overlays the spacer)
└── SidebarInset (sibling, should be pushed by spacer)
```

## What should happen:
1. SidebarProvider creates a `flex` container
2. Sidebar creates a SPACER div that takes up 16rem width
3. Sidebar ALSO creates a fixed positioned element that overlays the spacer
4. SidebarInset fills the remaining flex space

## The problem:
The spacer isn't pushing the content. Either:
- The flex container isn't working
- The spacer has w-0
- The siblings aren't rendering correctly

## Check in browser DevTools:
1. Inspect the SidebarProvider - does it have `display: flex`?
2. Inspect the Sidebar wrapper - does it have the spacer div?
3. What width does the spacer div have?
4. Is SidebarInset a direct sibling of the Sidebar component's wrapper?
