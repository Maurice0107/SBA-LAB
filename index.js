// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  const learnerData = {};
  
  submissions.forEach(submission => {
    const learnerID = submission.learner_id;
    const assignmentID = submission.assignment_id;
    const score = submission.submission.score;
    const pointsPossible = AssignmentGroup.assignments.find(assignment => assignment.id === assignmentID).points_possible;

    if (!learnerData[learnerID]) {
      learnerData[learnerID] = { id: learnerID, totalScore: 0, totalPoints: 0, individualScores: {} };
    }

    learnerData[learnerID].totalScore += score;
    learnerData[learnerID].totalPoints += pointsPossible;
    learnerData[learnerID].individualScores[assignmentID] = score / pointsPossible;
  });

  const result = Object.values(learnerData).map(learner => {
    const avg = learner.totalScore / learner.totalPoints;
    const individualScores = { avg };
    for (const assignmentID in learner.individualScores) {
      individualScores[assignmentID] = learner.individualScores[assignmentID];
    }
    return individualScores;
  });

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
