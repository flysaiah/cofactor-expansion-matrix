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

findDeterminant = function(someMatrix) { //Recursive function that computes determinant using a cofactor expansion along the first row of the matrix
	console.log("function")
	var theDeterminant;
	if (someMatrix.get_num_columns() == 2) { //Base case; no more recursivity
		theDeterminant = someMatrix.entries[0][0] * someMatrix.entries[1][1] - someMatrix.entries[1][0] * someMatrix.entries[0][1]; //ad-bc
		console.log(theDeterminant);
	}
	else {
		var firstrow = someMatrix[0];
		var arrayofmatrices = []; //Holds Matrix objects to be used in the recursive call
		var cur_row = 0;
		for (var cur_col=0; cur_col<someMatrix.get_num_columns(); cur_col++) {
			var newMatrix = new Matrix(someMatrix.get_num_rows()-1, someMatrix.get_num_columns()-1)
			var _i = 0;
			for (var i=0; i<someMatrix.get_num_columns(); i++) {
				var _j = 0;
				if (i != cur_col) {
					for (var j=0; j<someMatrix.get_num_rows(); j++) {
						if (j != cur_row) {
							newMatrix.addEntry(_i, _j, someMatrix.entries[i][j]);
							_j++;
						}
					}
					_i++;
				}
			}
			arrayofmatrices.push(newMatrix);
		}
		console.log(arrayofmatrices);
	}
}
matrixCreate = function() {
	var theMatrix = new Matrix(5, 5); //Create 5x5 matrix prototype
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
	submitmatrixbutton.onclick = function() { //Adds user input values to Matrix Object
		for (i=0; i<5; i++) {
			for (var j=0; j<5; j++) {
				var entryID = String(i) + String(j);
				var entry = document.getElementById(entryID).value;
				theMatrix.addEntry(i, j, entry);
			}
		}
		console.log(theMatrix);

		findDeterminant(theMatrix);
	}
	var submitmatrixdiv = document.getElementById('submitmatrixdiv'); //Pushes button to page
	submitmatrixdiv.appendChild(submitmatrixbutton);

}