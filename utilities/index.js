// Utility function to render vehicle detail HTML
exports.renderVehicleDetail = (vehicle) => {
    // Construct HTML with vehicle details
    return `
        <div>
            <h1>${vehicle.make} ${vehicle.model}</h1>
            <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
            <p>Year: ${vehicle.year}</p>
            <p>Price: $${vehicle.price.toLocaleString()}</p>
            <p>Mileage: ${vehicle.mileage.toLocaleString()} miles</p>
            <!-- Add other vehicle details as needed -->
        </div>
    `;
};
