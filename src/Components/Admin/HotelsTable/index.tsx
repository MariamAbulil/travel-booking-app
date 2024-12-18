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

// Define types for the hotel data based on the updated API response
interface Hotel {
  id?: number;
  name: string;
  description: string;
  hotelType: number;
  latitude: number;
  longitude: number;
  starRating: number;
}

const HotelsTable: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]); // Store hotels data
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]); // Filtered hotels data
  const [page, setPage] = useState<number>(0); // Track current page
  const [totalHotels, setTotalHotels] = useState<number>(0); // Track total hotels count
  const [pageSize, setPageSize] = useState<number>(10); // Track page size

  // For creating hotel dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [newHotel, setNewHotel] = useState<Hotel>({
    id: 0,
    name: "",
    description: "",
    hotelType: 0,
    latitude: 0,
    longitude: 0,
    starRating: 0,
  });

  // For search functionality
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch hotels data based on page number and page size
  const fetchHotels = async (pageNumber: number, pageSize: number) => {
    const response = await fetch(
      `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels?pageSize=${pageSize}&pageNumber=${pageNumber + 1}`
    );
    const data: Hotel[] = await response.json();

    setHotels(data || []); // Update hotels state with fetched data
    setTotalHotels(data.length); // Update total hotels count
    setFilteredHotels(data); // Set filtered hotels to all hotels initially
  };

  // Effect to fetch data when page or pageSize changes
  useEffect(() => {
    fetchHotels(page, pageSize);
  }, [page, pageSize]);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10)); // Update page size
    setPage(0); // Reset to first page when page size changes
  };

  // Handle removing a hotel
  const handleRemoveHotel = async (hotelId: number) => {
    const response = await fetch(
      `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${hotelId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (response.ok) {
      // Remove hotel from state after successful deletion
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      setTotalHotels(totalHotels - 1); // Decrease the total count of hotels
      setFilteredHotels(filteredHotels.filter((hotel) => hotel.id !== hotelId)); // Also remove from filtered hotels
    } else {
      console.error("Failed to delete hotel");
    }
  };

  // Handle creating a new hotel
  const handleCreateHotel = async () => {
    const response = await fetch(
      `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(newHotel),
      }
    );

    if (response.ok) {
      const createdHotel = await response.json();
      setHotels([...hotels, createdHotel]);
      setFilteredHotels([...filteredHotels, createdHotel]); // Add to filtered hotels
      setOpenDialog(false); // Close the dialog after creating the hotel
      setNewHotel({
        name: "",
        description: "",
        hotelType: 0,
        latitude: 0,
        longitude: 0,
        starRating: 0,
      }); // Clear input fields
    } else {
      console.error("Failed to create hotel");
    }
  };

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter hotels based on search query (client-side filtering)
    if (query === "") {
      setFilteredHotels(hotels); // Reset filtered hotels to all hotels when search is cleared
    } else {
      setFilteredHotels(
        hotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(query.toLowerCase())        )
      );
    }
  };

  return (
    <div className="flex gap-4 flex-col items-start">
      <TextField
        label="Search Hotels"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "16px" }}
      />

      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Create New Hotel
      </Button>

      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hotel Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Star Rating</TableCell>
              <TableCell>Hotel Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels.slice(page * pageSize, page * pageSize + pageSize).map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.description}</TableCell>
                <TableCell>{hotel.starRating}</TableCell>
                <TableCell>{hotel.hotelType}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => hotel.id && handleRemoveHotel(hotel.id)}
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
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={filteredHotels.length} // Update total count with the filtered hotels length
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for creating a new hotel */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Hotel</DialogTitle>
        <DialogContent>
          <TextField
            label="Hotel Name"
            fullWidth
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={newHotel.description}
            onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Hotel Type"
            fullWidth
            type="number"
            value={newHotel.hotelType}
            onChange={(e) => setNewHotel({ ...newHotel, hotelType: parseInt(e.target.value, 10) })}
            margin="normal"
          />
          <TextField
            label="Latitude"
            fullWidth
            type="number"
            value={newHotel.latitude}
            onChange={(e) => setNewHotel({ ...newHotel, latitude: parseFloat(e.target.value) })}
            margin="normal"
          />
          <TextField
            label="Longitude"
            fullWidth
            type="number"
            value={newHotel.longitude}
            onChange={(e) => setNewHotel({ ...newHotel, longitude: parseFloat(e.target.value) })}
            margin="normal"
          />
          <TextField
            label="Star Rating"
            fullWidth
            type="number"
            value={newHotel.starRating}
            onChange={(e) => setNewHotel({ ...newHotel, starRating: parseInt(e.target.value, 10) })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateHotel} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HotelsTable;
