export default function EditSchool(props) {
  return (
    <FileBrowser
      singleFile={true}
      onFilesListChange={handleLogoListChange}
      heading='Add A Logo Image'
      placeholder='Enter a title to use for the image'
    />
  );
}
