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
	addEntry: function(row, column, entry_value) {
		this.entries[row][column] = entry_value;
	},
	getEntry: function(row, column) {
		return this.entries[row][column];
	},
	getRow: function(row) {
		return this.entries[row];
	}
}

findDeterminant = function(someMatrix) { //Recursive function that computes determinant using a cofactor expansion along the first row of the matrix
	if (someMatrix.get_num_columns() == 2) { //Base case; no more recursivity
		var theDeterminant = someMatrix.getEntry(0,0) * someMatrix.getEntry(1,1) - someMatrix.getEntry(1,0) * someMatrix.getEntry(0,1); //ad-bc
		return theDeterminant
	}
	else {
		var firstrow = someMatrix.getRow(0);
		var arrayofmatrices = []; //Holds Matrix objects to be used in the recursive call
		var cur_row = 0;
		for (var cur_col=0; cur_col<someMatrix.get_num_columns(); cur_col++) {
			var newMatrix = new Matrix(someMatrix.get_num_rows()-1, someMatrix.get_num_columns()-1)
			var _i = 0;
			for (var i=0; i<someMatrix.get_num_rows(); i++) {
				var _j = 0;
				if (i != cur_row) {
					for (var j=0; j<someMatrix.get_num_columns(); j++) {
						if (j != cur_col) {
							newMatrix.addEntry(_i, _j, someMatrix.getEntry(i, j));
							_j++;
						}
					}
					_i++;
				}
			}
			arrayofmatrices.push(newMatrix);
		}
		var theDeterminant = 0;
		var sign = 1;
		for (var i=0; i<firstrow.length; i++) {
			theDeterminant = theDeterminant + sign*firstrow[i]*findDeterminant(arrayofmatrices[i]);
			sign *= -1;
		}
		return theDeterminant
	}
}
matrixCreate = function() {
	var theMatrix = new Matrix(4, 4); //Create 5x5 matrix prototype
	for (var i=0; i<4; i++) { //Create empty 5x5 matrix
		for (var j=0; j<4; j++) {
			var entrybox = document.createElement('INPUT');
			entrybox.type = "text";
			entrybox.className = "matrixinput"
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
		for (i=0; i<4; i++) {
			for (var j=0; j<4; j++) {
				var entryID = String(i) + String(j);
				var entry = document.getElementById(entryID).value;
				theMatrix.addEntry(i, j, entry);
			}
		}

		var det_A = findDeterminant(theMatrix);  //Push answer to screen
		var det_container = document.createElement('P');
		det_container.innerHTML = String(det_A);
		var det_div = document.getElementById('det_div');
		det_div.innerHTML = "";
		det_div.appendChild(det_container);


	}
	var submitmatrixdiv = document.getElementById('submitmatrixdiv'); //Pushes button to page
	submitmatrixdiv.appendChild(submitmatrixbutton);

}