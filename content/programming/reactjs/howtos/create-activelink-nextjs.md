+++
title = "Create an Active Link in Next.js"
[taxonomies]
topics = [ "React.js", "Next.js" ]
+++

In Next.js, you can use the built-in router to detect an active link.

The default `Link` component from Next.js doesn't allow to distinguish between active and non-active links. You must create your own component that wraps the built-in `Link` component and uses the `useRouter` hook to check if there is a link to style for the currently displayed route.

```tsx
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
```