import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  intro,
  outro,
  text,
  select,
  confirm,
  spinner,
  isCancel,
  cancel,
  log,
} from '@clack/prompts'
import { cyan, green, dim, bold, red } from 'kolorist'
import {
  formatTargetDir,
  isEmptyDir,
  emptyDir,
  pkgFromUserAgent,
  copyDir,
} from './utils'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function run(): Promise<void> {
  const isTTY = Boolean(process.stdin.isTTY && process.stdout.isTTY)
  const argv = process.argv.slice(2)

  // Parse command line flags
  const flags = {
    force: argv.includes('--force') || argv.includes('-f'),
    pnpm: argv.includes('--pnpm'),
    npm: argv.includes('--npm'),
    yarn: argv.includes('--yarn'),
    bun: argv.includes('--bun'),
  }

  // Filter out flag arguments to get target directory
  const nonFlagArgs = argv.filter((arg) => !arg.startsWith('-'))
  let targetDir = formatTargetDir(nonFlagArgs[0])
  const defaultProjectName = targetDir || 'nala-admin-app'

  if (isTTY) {
    console.log()
    intro(bold(cyan('✦ create-nala — Scaffold a Modern Vue 3 Admin Dashboard ✦')))
  } else {
    console.log(bold(cyan('\n✦ create-nala (Non-interactive mode) ✦\n')))
  }

  // 1. Prompt for project name / directory if not provided
  if (!targetDir) {
    if (isTTY) {
      const projectDirInput = await text({
        message: 'Project name / directory:',
        placeholder: defaultProjectName,
        defaultValue: defaultProjectName,
        validate(value) {
          if (!value || value.trim().length === 0) {
            return 'Project name cannot be empty.'
          }
          if (/[<>:"/\\|?*]/.test(value)) {
            return 'Directory name contains invalid characters.'
          }
        },
      })

      if (isCancel(projectDirInput)) {
        cancel('Scaffolding cancelled.')
        process.exit(0)
      }

      targetDir = formatTargetDir(projectDirInput as string) || defaultProjectName
    } else {
      targetDir = defaultProjectName
    }
  }

  const root = path.resolve(process.cwd(), targetDir)
  const appSlug = path.basename(root)
  const appName = appSlug
    .split(/[-_]+/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // 2. Check if destination directory exists and is not empty
  if (!isEmptyDir(root)) {
    if (flags.force) {
      emptyDir(root)
    } else if (isTTY) {
      const shouldOverwrite = await confirm({
        message: `Target directory "${targetDir}" is not empty. Remove existing files and continue?`,
        initialValue: false,
      })

      if (isCancel(shouldOverwrite) || !shouldOverwrite) {
        cancel('Operation cancelled.')
        process.exit(0)
      }

      emptyDir(root)
    } else {
      console.error(red(`Error: Target directory "${targetDir}" is not empty. Use --force to overwrite.`))
      process.exit(1)
    }
  }

  // 3. Determine Package Manager
  const detectedPkgManager = pkgFromUserAgent(process.env.npm_config_user_agent)
  let pkgManager = detectedPkgManager

  if (flags.pnpm) pkgManager = 'pnpm'
  else if (flags.npm) pkgManager = 'npm'
  else if (flags.yarn) pkgManager = 'yarn'
  else if (flags.bun) pkgManager = 'bun'
  else if (isTTY) {
    const pkgManagerSelection = await select({
      message: 'Select package manager:',
      initialValue: detectedPkgManager,
      options: [
        { value: 'pnpm', label: 'pnpm', hint: 'recommended' },
        { value: 'npm', label: 'npm' },
        { value: 'yarn', label: 'yarn' },
        { value: 'bun', label: 'bun' },
      ],
    })

    if (isCancel(pkgManagerSelection)) {
      cancel('Scaffolding cancelled.')
      process.exit(0)
    }

    pkgManager = String(pkgManagerSelection)
  }

  // 4. Scaffold project
  const templateDir = path.resolve(__dirname, '../template')

  if (isTTY) {
    const s = spinner()
    s.start(`Scaffolding project in ${cyan(root)}...`)

    try {
      copyDir(templateDir, root, {
        NALA_APP_NAME: appName,
        NALA_APP_SLUG: appSlug,
      })
      s.stop(`Scaffolded project in ${green(root)}`)
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      s.stop(red('Failed to scaffold project.'))
      log.error(errorMsg)
      process.exit(1)
    }
  } else {
    console.log(`Scaffolding project in ${cyan(root)}...`)
    copyDir(templateDir, root, {
      NALA_APP_NAME: appName,
      NALA_APP_SLUG: appSlug,
    })
    console.log(`Scaffolded project in ${green(root)}`)
  }

  // 5. Next steps instructions
  const cdCmd = targetDir === '.' ? '' : `cd ${targetDir}\n  `
  const installCmd = pkgManager === 'yarn' ? 'yarn' : `${pkgManager} install`
  const devCmd = pkgManager === 'npm' ? 'npm run dev' : `${pkgManager} dev`

  console.log()
  if (isTTY) {
    log.success(green('Project initialized successfully! 🎉'))
  } else {
    console.log(green('✓ Project initialized successfully! 🎉'))
  }
  console.log()
  console.log(bold('Next steps:'))
  console.log(dim(`  ${cdCmd}${installCmd}\n  ${devCmd}`))
  console.log()

  if (isTTY) {
    outro(cyan('Happy coding with Nala! ✨'))
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
