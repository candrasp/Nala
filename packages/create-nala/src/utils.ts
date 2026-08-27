import fs from 'node:fs'
import path from 'node:path'

export interface PkgInfo {
  name: string
  version: string
}

export function formatTargetDir(targetDir: string | undefined): string | undefined {
  return targetDir?.trim().replace(/\/+$/g, '')
}

export function isEmptyDir(dirPath: string): boolean {
  if (!fs.existsSync(dirPath)) {
    return true
  }
  const files = fs.readdirSync(dirPath)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export function emptyDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

export function pkgFromUserAgent(userAgent: string | undefined): string {
  if (!userAgent) return 'pnpm'
  const pkgSpec = userAgent.split(' ')[0]
  const pkgName = pkgSpec.split('/')[0]
  if (['pnpm', 'npm', 'yarn', 'bun'].includes(pkgName)) {
    return pkgName
  }
  return 'pnpm'
}

const TEXT_FILE_EXTENSIONS = new Set([
  '.json',
  '.html',
  '.md',
  '.ts',
  '.js',
  '.vue',
  '.css',
  '.svg',
  '.example',
  '.yaml',
  '.yml',
])

export function copyDir(
  srcDir: string,
  destDir: string,
  replacements: Record<string, string> = {}
): void {
  fs.mkdirSync(destDir, { recursive: true })

  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    let destFileName = file

    // Rename _gitignore to .gitignore
    if (file === '_gitignore') {
      destFileName = '.gitignore'
    }

    const destFile = path.resolve(destDir, destFileName)
    const stat = fs.statSync(srcFile)

    if (stat.isDirectory()) {
      copyDir(srcFile, destFile, replacements)
    } else {
      const ext = path.extname(file).toLowerCase()
      if (TEXT_FILE_EXTENSIONS.has(ext) || file.startsWith('.env') || file === '_gitignore' || file === 'LICENSE') {
        let content = fs.readFileSync(srcFile, 'utf-8')
        for (const [search, replace] of Object.entries(replacements)) {
          content = content.replaceAll(search, replace)
        }
        fs.writeFileSync(destFile, content, 'utf-8')
      } else {
        fs.copyFileSync(srcFile, destFile)
      }
    }
  }
}
