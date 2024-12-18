import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// Define types for the city data based on the API response
interface City {
  id?: number;
  name: string;
  description: string;
}

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]); // Store cities data
  const [filteredCities, setFilteredCities] = useState<City[]>([]); // Filtered cities data
  const [page, setPage] = useState<number>(0); // Track current page
  const [totalCities, setTotalCities] = useState<number>(0); // Track total cities count
  const [pageSize, setPageSize] = useState<number>(10); // Track page size

  // For creating city dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [newCity, setNewCity] = useState<City>({ id: 0, name: "", description: "" });

  // For search functionality
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch cities data based on page number and page size
  const fetchCities = async (pageNumber: number, pageSize: number) => {
    const response = await fetch(
      `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities?pageSize=${pageSize}&pageNumber=${pageNumber + 1}`
    );
    const data: City[] = await response.json();

    setCities(data || []); // Update cities state with fetched data
    setTotalCities(data.length); // Update total cities count
    setFilteredCities(data); // Set filtered cities to all cities initially
  };

  // Effect to fetch data when page or pageSize changes
  useEffect(() => {
    fetchCities(page, pageSize);
  }, [page, pageSize]);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10)); // Update page size
    setPage(0); // Reset to first page when page size changes
  };

  // Handle removing a city
  const handleRemoveCity = async (cityId: number) => {
    const response = await fetch(
      `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities/${cityId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (response.ok) {
      // Remove city from state after successful deletion
      setCities(cities.filter((city) => city.id !== cityId));
      setTotalCities(totalCities - 1); // Decrease the total count of cities
      setFilteredCities(filteredCities.filter((city) => city.id !== cityId)); // Also remove from filtered cities
    } else {
      console.error("Failed to delete city");
    }
  };

  // Handle creating a new city
  const handleCreateCity = async () => {
    const response = await fetch(
      `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(newCity),
      }
    );

    if (response.ok) {
      const createdCity = await response.json();
      setCities([...cities, createdCity]);
      setFilteredCities([...filteredCities, createdCity]); // Add to filtered cities
      setOpenDialog(false); // Close the dialog after creating the city
      setNewCity({ name: "", description: "" }); // Clear input fields
    } else {
      console.error("Failed to create city");
    }
  };

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter cities based on search query (client-side filtering)
    if (query === "") {
      setFilteredCities(cities); // Reset filtered cities to all cities when search is cleared
    } else {
      setFilteredCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <TextField
        label="Search Cities"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "16px" }}
      />

      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Create New City
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCities.slice(page * pageSize, page * pageSize + pageSize).map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => city.id && handleRemoveCity(city.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[2, 5, 20, 30, 50]}
        component="div"
        count={filteredCities.length} // Update total count with the filtered cities length
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for creating a new city */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New City</DialogTitle>
        <DialogContent>
          <TextField
            label="City Name"
            fullWidth
            value={newCity.name}
            onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={newCity.description}
            onChange={(e) => setNewCity({ ...newCity, description: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateCity} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CitiesTable;