import Link from 'next/link'
import { Button } from 'antd'

export default ({ children }) => (
  <div>
    <header>
      <Link href="/a?id=1" as="/a/1">
        <Button>to a</Button>
      </Link>

      <Link href="/b?id=121" as="/b/121">
        <Button>to b</Button>
      </Link>
    </header>
    {children}
  </div>
)
