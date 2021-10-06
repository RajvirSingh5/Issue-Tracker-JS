
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	
	// To get an unique identifier for an issue, we are using chance.js script 
	var issueId = chance.guid(); //guid : Global Unique Identifier.
	var issueStatus = 'Open';
	
	
	// creating class : issue with properties id, description, sev, assignedTo, status
	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
		
	};
	
	
	/* Check if there is any existing issue stored in local storage. 
	If local storage is empty, we create a empty array 'issues'.
	Then we will push new issues in this array.
	
	Else, we parse existing issues stored in local stroage.

	*/
	if(localStorage.getItem('issues') == null) {
		let issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}
	else {
		let issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
		
	}
	document.getElementById('issueInputForm').reset();
	fetchIssues();
	
	e.preventDefault(); //To prevent form from submitting.
}

function setStatusClosed(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));
	
	for(let i = 0; i < issues.length; i++) {
		if(issues[i].id == id) {
			issues[i].status = 'Closed';
		}
		
		
	}
	
	localStorage.setItem('issues', JSON.stringify(issues));
	fetchIssues();
	
}



function deleteIssue(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));
	
	for(let i = 0; i < issues.length; i++) {
		if(issues[i].id == id) {
			issues.splice(i, 1);
		}
		
	}
	localStorage.setItem('issues', JSON.stringify(issues));
	fetchIssues();
}

/* Function FetchIssues will be used to fetch  the list of
issues. Browser is used to store the issues data.
*/


function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesList = document.getElementById('issuesList');
	
	//Make issueList content empty
	issuesList.innerHTML = '';
	
	for(var i = 0; i < issues.length; i++) {
		var id = issues[i].id;
		var desc = issues[i].description;
		var severity= issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;
		
		
		/* We want to botain below Html format for issue list below the form.  */
		issuesList.innerHTML += '<div class="well">' +
							'<h6>Issue ID: ' + id + '</h6>' +
							'<p><span class="label label-info">' + status + '</span></p>' +
							'<h3>' + desc + '</h3>' +
							'<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
							'<p><span class="glyphicon	glyphicon-user"></span>' + assignedTo + '</p>' +	
							'<a href="#" onclick="setStatusClosed(\'' + id+'\')" class="btn btn-warning"  > Close</a>' + 
							'<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger"  > Delete</a>' + 
							'</div>';
							
	}						
	
}