Matrix = function(m, n) {  //Matrix prototype that is created when user clicks 'Create matrix' button
	this.num_rows = m;
	this.num_columns = n;
	this.entries = [];
	for (var i=0; i<this.num_columns; i++) { //Adds correct number of columns to Matrix
		this.entries.push([])
	}
}

Matrix.prototype = {
	get_num_rows: function() {
		return this.num_rows;
	},
	get_num_columns: function() {
		return this.num_columns;
	},
	addEntry: function(column, row, entry_value) {
		this.entries[column][row] = entry_value;
	}
}


matrixCreate = function() {
	var theMatrix = new Matrix(5, 5); //Create 5x5 matrix prototype
	console.log(theMatrix)
	for (var i=0; i<5; i++) { //Create empty 5x5 matrix
		for (var j=0; j<5; j++) {
			var entrybox = document.createElement('INPUT');
			entrybox.type = "text";
			entrybox.id = String(i) + String(j);
			entrybox.value = 0;
			var matrixdiv = document.getElementById('matrixdiv');
			matrixdiv.appendChild(entrybox);
		}
		var newline = document.createElement('BR')
		matrixdiv.appendChild(newline);
	}
	var submitmatrixbutton = document.createElement('BUTTON'); //Create submit matrix button
	submitmatrixbutton.innerHTML = "Find Determinant"
	submitmatrixbutton.onclick = function() {
		//code here for adding entries
	}
	var submitmatrixdiv = document.getElementById('submitmatrixdiv');
	submitmatrixdiv.appendChild(submitmatrixbutton);

}