import { saveAs } from 'file-saver';

// Example data
const csvContent = 'Name, Age\nJohn, 30\nAlice, 25';

// Creating a Blob
const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

// Saving the Blob as a file
saveAs(blob, 'data.csv');
