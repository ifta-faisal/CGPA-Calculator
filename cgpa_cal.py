from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Getting data from the form
        completed_credits = float(request.form['completedCredits'])
        current_cgpa = float(request.form['currentCGPA'])
        
        # Calculate initial cumulative points from completed credits and CGPA
        cumulative_credits = completed_credits
        cumulative_points = completed_credits * current_cgpa
        
        # Track total credits and grade points for the current semester
        current_credits = 0
        current_points = 0

        course_count = int(request.form['courseCount'])
        
        for i in range(1, course_count + 1):
            course_credits = float(request.form[f'credits{i}'])
            grade = float(request.form[f'grade{i}'])
            
            # Update current semester credits and points
            current_credits += course_credits
            current_points += course_credits * grade
        
        # Calculate GPA for current semester
        gpa = current_points / current_credits if current_credits > 0 else 0
        
        # Update cumulative credits and points for CGPA calculation
        cumulative_credits += current_credits
        cumulative_points += current_points
        
        # Calculate CGPA including the new semester
        cgpa = cumulative_points / cumulative_credits if cumulative_credits > 0 else 0
        
        return render_template('index.html', gpa=round(gpa, 2), cgpa=round(cgpa, 2))
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
