const UserInput = document.getElementById('userInput');
const Id = document.getElementById('ID');
const Name = document.getElementById('name');
const Email = document.getElementById('email');
const address = document.getElementById('Address');
const Data_Table = document.querySelector('.Data_Table');

let result;

async function GetData() {
    const response = await fetch('https://dummyapi.online/api/users');
    result = await response.json();
    showdta(result);    
}
GetData();

function showdta(result) {
    let tableBody = document.getElementById('tableBody');
    let res = '';
    result.forEach(item => {
        res += `
        <tr>
            <td class="${Id.checked ? 'skyblue' : ''}">${item.id}</td>
            <td class="${Name.checked ? 'skyblue' : ''}">${item.name}</td>
            <td class="${Email.checked ? 'skyblue' : ''}">${item.username}</td>
            <td class="${Email.checked ? 'skyblue' : ''}">${item.email}</td>
            <td class="${address.checked ? 'skyblue' : ''}">${item.address.street}</td>
        </tr>`;
    });
    tableBody.innerHTML = res;
}

function idbehalf(input) {
    const checkboxes = [Id, Name, Email, address];
    const checkedCheckboxes = checkboxes.filter(checkbox => checkbox.checked);
    if (checkedCheckboxes.length > 0) {
        const filteredArr = result.filter(item => {
            return checkedCheckboxes.some(checkbox => {
                const key = checkbox.id.toLowerCase();
                if (key === 'address') {
                    const addressValue = item[key].street;
                    if (typeof addressValue === 'string') {
                        return addressValue.toLowerCase().includes(input.toLowerCase());
                    }
                    return false;
                } else {
                    const value = item[key];
                    if (typeof value === 'string' || typeof value === 'number') {
                        const stringValue = typeof value === 'number' ? value.toString() : value;
                        return stringValue.toLowerCase().includes(input.toLowerCase());
                    }
                    return false;
                }  
            });
        });
        showdta(filteredArr);
    } else {
        const filteredArr = result.filter(item => {
            return Object.values(item).some(prop => {
                if (typeof prop === 'string' || typeof prop === 'number') {
                    const stringValue = typeof prop === 'number' ? prop.toString() : prop;
                    return stringValue.toLowerCase().includes(input.toLowerCase());
                }
                return false;
            });
        });
        showdta(filteredArr);
    }
}

UserInput.addEventListener('keyup', (e) => {
    idbehalf(e.target.value);
});

const checkboxes = [Id, Name, Email, address];
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        idbehalf(UserInput.value);
    });
});
