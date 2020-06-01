import * as React from 'react'

export default function Footer() {
  const thisYear = new Date().getFullYear()
  return (
    <p style={{ textAlign: 'center' }}>
      Copyright © 2019 - {thisYear} ling & pikou
    </p>
  )
}
