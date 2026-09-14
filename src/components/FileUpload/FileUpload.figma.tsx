import figma from '@figma/code-connect'
import { FileUpload } from './FileUpload'

figma.connect(
  FileUpload,
  'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New?node-id=2326-65',
  {
    example: () => <FileUpload hint="PNG · JPG · XLSX — hasta 10 MB" />,
  },
)
