let courseCount = 1;  // Initialize course count

document.getElementById('addCourseBtn').addEventListener('click', function() {
    courseCount++;  // Increment course count

    // Create a new div for the course input fields
    const newCourseDiv = document.createElement('div');
    newCourseDiv.classList.add('course-input');
    newCourseDiv.id = `course${courseCount}`;  // Set unique id for each course

    // Add HTML structure for the new course
    newCourseDiv.innerHTML = `
        <label for="course${courseCount}-name">Course ${courseCount}:</label>
        <input type="text" id="course${courseCount}-name" placeholder="Course Name" required>
        <input type="number" id="credits${courseCount}" placeholder="Credits" required>
        <select id="grade${courseCount}">
            <option value="4.00">A</option>
            <option value="3.67">A-</option>
            <option value="3.33">B+</option>
            <option value="3.00">B</option>
            <option value="2.67">B-</option>
            <option value="2.33">C+</option>
            <option value="2.00">C</option>
            <option value="1.67">C-</option>
            <option value="1.33">D+</option>
            <option value="1.00">D</option>
            <option value="0.00">F</option>
        </select>
    `;

    document.getElementById('course-list').appendChild(newCourseDiv);
});

function calculateGPA() {
    const completedCredits = parseFloat(document.getElementById('completedCredits').value);
    const currentCGPA = parseFloat(document.getElementById('currentCGPA').value);

    let cumulativeCredits = completedCredits;
    let cumulativePoints = completedCredits * currentCGPA;

    let currentCredits = 0;
    let currentPoints = 0;

    for (let i = 1; i <= courseCount; i++) {
        const courseCredits = parseFloat(document.getElementById(`credits${i}`).value);
        const courseGrade = parseFloat(document.getElementById(`grade${i}`).value);
        
        if (!isNaN(courseCredits) && !isNaN(courseGrade)) {
            currentCredits += courseCredits;
            currentPoints += courseCredits * courseGrade;
        }
    }

    const gpa = currentPoints / currentCredits;
    cumulativeCredits += currentCredits;
    cumulativePoints += currentPoints;
    
    const cgpa = cumulativePoints / cumulativeCredits;

    document.getElementById('gpa').textContent = gpa.toFixed(2);
    document.getElementById('cgpa').textContent = cgpa.toFixed(2);
}
