import * as React from "react";
import FileInput from "@cloudscape-design/components/file-input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Table from "@cloudscape-design/components/table";

export default () => {
  const [value, setValue] = React.useState([]);
  const handleOnChange = ({ detail }) => {
    console.log(detail.value);
    setValue(detail.value);
    const file = detail.value[0];
    const fileReader = new FileReader(); // get blob type file

    // Event listener to trigger logic after async file reading completes
    fileReader.onloadend = () => {
      console.log(fileReader.result);
      const base64Data = fileReader.result.split(",")[1];

      (async () => {
        const response = await fetch(
          "https://jyy48lmce7.execute-api.us-east-1.amazonaws.com/default/class_upload_image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: base64Data, fileName: "test" }),
          }
        );
        const result = await response.json();

        console.log(result.url);
      })();
    };

    // File reading
    fileReader.readAsDataURL(file);
  };
  return (
    <SpaceBetween size="s">
      <FileInput onChange={handleOnChange} value={value} multiple>
        Choose file
      </FileInput>
    </SpaceBetween>
  );
};
