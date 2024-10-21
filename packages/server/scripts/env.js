import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

if (!existsSync(resolve(cwd(), '.env'))) {
  copyFileSync(resolve(cwd(), '_env'), resolve(cwd(), '.env'))
}
