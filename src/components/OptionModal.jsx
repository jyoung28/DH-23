import React, { useState } from "react";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const OptionModal = ({ options, open, onClose, onSave }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    onSave(selectedOption);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ width: '70%', margin: "auto", marginTop: 50, padding: 20 }}>
      {options ? (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Calories</TableCell>
          <TableCell>Carbohydrates</TableCell>
          <TableCell>Fat</TableCell>
          <TableCell>Fiber</TableCell>
          <TableCell>Potassium</TableCell>
          <TableCell>Protein</TableCell>
          <TableCell>Serving Size</TableCell>
          <TableCell>Sugar</TableCell>
          <TableCell>Select</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {options.map((option, index) => {
          // Check if 'Items' is not empty
          if (option.items && option.items.length > 0) {
            const item = option.items[0]; // Assuming you're interested in the first item
            return (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.calories}</TableCell>
                <TableCell>{item.carbohydrates_total_g}</TableCell>
                <TableCell>{item.fat_total_g}</TableCell>
                <TableCell>{item.fiber_g}</TableCell>
                <TableCell>{item.potassium_mg}</TableCell>
                <TableCell>{item.protein_g}</TableCell>
                <TableCell>{item.serving_size_g}</TableCell>
                <TableCell>{item.sugar_g}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOptionSelect(item)}
                  >
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            );
          } else {
            // Handle the case when 'Items' is empty (no nutritional facts)
            return (
              <TableRow key={index}>
                <TableCell colSpan={12}>
                  No nutritional facts available for this item.
                </TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </Table>
  </TableContainer>
) : (
  <Typography variant="h6" style={{ textAlign: "center" }}>
    No food options available.
  </Typography>
)}

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!selectedOption}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OptionModal;
