
let employees = [
    {
        id: 1,
        fullName: "John Smith",
        email: "john.smith@company.com",
        phone: "+1 (555) 123-4567",
        department: "IT",
        position: "Senior Developer"
    },
    {
        id: 2,
        fullName: "Sarah Johnson",
        email: "sarah.j@company.com",
        phone: "+1 (555) 234-5678",
        department: "HR",
        position: "HR Manager"
    },
    {
        id: 3,
        fullName: "Michael Chen",
        email: "m.chen@company.com",
        phone: "+1 (555) 345-6789",
        department: "Sales",
        position: "Sales Director"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'view-contacts.html' || currentPage === '') {
        loadContactsTable();
    }
    
    if (currentPage === 'new-contact.html') {
        initializeContactForm();
    }
});


function loadContactsTable() {
    const tableBody = document.getElementById('contactsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${employee.fullName}</strong></td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td><span class="dept-badge">${employee.department}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info" onclick="viewDetails(${employee.id})">Details</button>
                    <button class="btn btn-warning" onclick="editContact(${employee.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteContact(${employee.id})">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const newEmployee = {
            id: employees.length + 1,
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            position: document.getElementById('position').value
        };
        
        
        employees.push(newEmployee);
        
        
        showAlert('Contact added successfully!', 'success');
        

        form.reset();
        
        
        setTimeout(() => {
            if (confirm('Contact added! Would you like to view all contacts?')) {
                window.location.href = 'view-contacts.html';
            }
        }, 100);
    });
}


function viewDetails(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        const details = `
Employee Details:
----------------
Name: ${employee.fullName}
Email: ${employee.email}
Phone: ${employee.phone}
Department: ${employee.department}
Position: ${employee.position}
        `;
        alert(details);
    }
}


function editContact(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        
        const message = `
Edit Contact: ${employee.fullName}
--------------------------------
Current Information:
• Email: ${employee.email}
• Phone: ${employee.phone}
• Department: ${employee.department}
• Position: ${employee.position}

(In a full application, this would open an edit form)
        `;
        alert(message);
        
    
        console.log(`Editing contact with ID: ${id}`);
    }
}

// Delete 
function deleteContact(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        const confirmMessage = `Are you sure you want to delete ${employee.fullName}?`;
        
        if (confirm(confirmMessage)) {
            // Remove from array
            employees = employees.filter(emp => emp.id !== id);
            
            // Reload table
            loadContactsTable();
            
            // Show success message
            showAlert('Contact deleted successfully!', 'success');
        }
    }
}

// Utility function to show alerts
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at top of container
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// Add CSS for department badges dynamically
const style = document.createElement('style');
style.textContent = `
    .dept-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        background-color: #e0e7ff;
        color: #3730a3;
    }
`;
document.head.appendChild(style);