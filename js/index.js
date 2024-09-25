
// Responsive menu toggle
const mobileBtn = document.getElementById('mobile-screen-menu-btn');
const menuBtn = document.getElementById('menu-btn')
    .addEventListener('click', () => {
     mobileBtn.classList.toggle('hidden');
});

// Close menu 
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-screen-menu-btn');
    const menuButton = document.getElementById('menu-btn');
    
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

// donation values
let noakhaliDonated = 0;
let feniDonated = 600;
let quotaDonated = 2400;
let totalBalance = parseFloat(document.getElementById('total-balance').innerText);

// handle donations
function handleDonation(btnId, inputId, displayId, donationTracker, donationType) {
    const btn = document.getElementById(btnId);
    btn.addEventListener('click', () => {
        const amount = parseFloat(document.getElementById(inputId).value);
        
        if (!isNaN(amount) && amount > 0) {
            if (amount > totalBalance) {
                alert('Insufficient balance.');
                return;
            }

            donationTracker += amount;
            totalBalance -= amount;

            // Update the display amount 
            document.getElementById(displayId).innerText = donationTracker + ' BDT';
            document.getElementById('total-balance').innerText = totalBalance + ' BDT';
            
            // donation to history
            addToHistory(donationType, amount);
            showModal();

        } else {
            alert('Please enter a valid amount.');
        }

        document.getElementById(inputId).value = '';
    });
}


handleDonation('donate-btn-1', 'donation-amount-1', 'donated-noakhali', noakhaliDonated, 'Donate for Flood at Noakhali, Bangladesh');
handleDonation('donate-btn-2', 'donation-amount-2', 'donated-feni', feniDonated, 'Donate for Flood Relief in Feni,Bangladesh');
handleDonation('donate-btn-3', 'donation-amount-3', 'donated-quota', quotaDonated, 'Aid for Injured in the Quota Movement');


function addToHistory(type, amount) {
    const historyList = document.getElementById('history-list');
    const newItem = document.createElement('li');
    
    // Donation time format 
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Dhaka' 
    });

    newItem.innerHTML = `Donated ${amount} BDT to ${type} <br> ${formattedTime}`;
    historyList.appendChild(newItem);
}

// donation confirmation message show 
const modal = document.getElementById('congratulations-card');
const closeModalBtn = document.getElementById('close-modal');
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

function showModal() {
    modal.classList.remove('hidden');
}

// Donation and History button moving 
const donationTab = document.getElementById('donation-tab');
const historyTab = document.getElementById('history-tab');
const donationSection = document.getElementById('donation-section');
const historySection = document.getElementById('history-section');


donationTab.addEventListener('click', () => {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    donationTab.classList.add('active-button');
    donationTab.classList.remove('inactive-button');
    historyTab.classList.remove('active-button');
    historyTab.classList.add('inactive-button');
});

historyTab.addEventListener('click', () => {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    historyTab.classList.add('active-button');
    historyTab.classList.remove('inactive-button');
    donationTab.classList.remove('active-button');
    donationTab.classList.add('inactive-button');
});

