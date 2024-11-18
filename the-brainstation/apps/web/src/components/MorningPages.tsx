import React, { useState } from "react";
import { Box, Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MorningPages = ({ morningPages, setMorningPages }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [wordCount, setWordCount] = useState(0);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const text = state.getCurrentContent().getPlainText();
    const words = text.match(/\b[-?(\w+)?]+\b/gi);
    setWordCount(words ? words.length : 0);
    handleMorningPagesChange(text);
  };

  const toggleInlineStyle = (style) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleMorningPagesChange = (text: string) => {
    setMorningPages(text);
  };

  const handleKeyCommand = (command) => {
    let newState;
    switch (command) {
      case "bold":
        newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
        break;
      case "italic":
        newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
        break;
      case "underline":
        newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
        break;
      default:
        newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      handleEditorChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const keyBindingFn = (e) => {
    if (e.metaKey) {
      switch (e.key) {
        case "b":
          return "bold";
        case "i":
          return "italic";
        case "u":
          return "underline";
        default:
          return getDefaultKeyBinding(e);
      }
    }
    return getDefaultKeyBinding(e);
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h6">Morning Pages</Typography>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBindingFn}
            onChange={handleEditorChange}
          />
        </div>
        <Typography variant="body2" color="textSecondary">
          Word Count: {wordCount} / 750
        </Typography>
      </Paper>
    </Grid>
  );
};

export default MorningPages;
