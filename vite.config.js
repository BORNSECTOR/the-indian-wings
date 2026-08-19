import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const downloadPlugin = () => ({
  name: 'project-download',
  configureServer(server) {
    server.middlewares.use('/download', (_request, response) => {
      const archive = path.resolve(process.cwd(), '../the-indian-wings.zip')
      if (!fs.existsSync(archive)) {
        response.statusCode = 404
        response.end('Project archive is not available in this workspace.')
        return
      }
      response.setHeader('Content-Type', 'application/zip')
      response.setHeader('Content-Disposition', 'attachment; filename="the-indian-wings.zip"')
      fs.createReadStream(archive).pipe(response)
    })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), downloadPlugin()],
  server: { host: '0.0.0.0', allowedHosts: true },
})
