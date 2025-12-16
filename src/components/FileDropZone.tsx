import { Box, FileUpload, Icon } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"
import DecryptedText from "./DecryptedText"

const FileDropZone = ({ handleFileChange }: { handleFileChange: (imageSrc: string | null) => void }) => {


  return (
    <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1} accept={{'image/png': ['.png'],'image/jpeg': ['.jpg', '.jpeg']}}>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <FileUpload.DropzoneContent>
          <Box color="fg.muted">
            {/* <Box>.png, .jpg up to 5MB</Box> */}
            <Icon size="md" color="fg.muted">
              <LuUpload />
            </Icon>
          </Box>
          <Box>
            <div style={{color: '#a4a4a4', fontFamily: 'monospace', fontSize: '1.5rem'}}> 
              <DecryptedText
                text="Drop a file to start"
                animateOn="view"
                speed={50}
                maxIterations={20}
                sequential={true}
              />
            </div>
          </Box>
          {/* <Box color="fg.muted">
            <Box>.png, .jpg up to 5MB</Box>
          </Box> */}
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      {/* <FileUpload.List /> */}
    </FileUpload.Root>
  )
}

export default FileDropZone