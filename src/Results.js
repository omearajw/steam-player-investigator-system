import './App.css';

// Function used to smoothly scroll to the results
export const ScrollToResults = () => {
    // Timeout used as this function is technically called before the results section is displayed and will therefore break
    setTimeout(() => {
    // Gets the results element
    const element = document.getElementById("Results-Header");
    // Scrolls to the element
    element.scrollIntoView({ behavior: 'smooth' }); // Optional: smooth scrolling
    }, 0)
}

// Results section
export const Results = () => {
    return (
        <div>
            <header id="Results-Header">
                DATA GOES HERE
            </header>
        </div>
    );
}