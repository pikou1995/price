import * as React from 'react'
import pkg from '../../../package.json'

export default function Footer() {
  const thisYear = new Date().getFullYear()
  return (
    <p style={{ textAlign: 'center' }}>
      Copyright © 2019 - {thisYear} version:{pkg.version} <br />
      Ling & Pikou
    </p>
  )
}
