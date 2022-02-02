function tableGen(e){
    currentTimeSheet = e.target.getAttribute('value');
    document.querySelector(".navName").innerHTML = currentPage + " Weeks " + currentTimeSheet;
    let projectWeekObj = projectMasterDict[currentChosenProject]["time_sheet_weeks"][currentTimeSheet];
    let tableContainer = document.getElementById("project_table");
    tableContainer.innerHTML = ''
    let colLetter = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
    let rowCount = 97 + colourCount;
    let tableHTML = '';
    let timeList = timeGen();
    let dateList = dateGen(projectWeekObj)
    for(col in colLetter){
        tableHTML += '<div>';
        for(let row = 0; row <= rowCount; row++){
            let cellID = colLetter[col] + row.toString();
            if(colLetter[col] != 'Z'){
                if(row == 0){
                    tableHTML += `<div value="${cellID}">${dateList[col - 1]}</div>`;
                } else if(row >= 97){
                    tableHTML += `<div value="${cellID}"></div>`;
                } else {
                    tableHTML += `<div value="${cellID}" onmousedown="cellClicked(event)" onmouseover="cellHovered(event)" onmouseup="cellRelease(event)"></div>`;
                }
            }else{
                tableHTML += `<div value="${cellID}">${timeList[row]}</div>`;
            }
        }
        tableHTML += '</div>';
    }
    tableContainer.innerHTML = tableHTML;
    let colouredCellList = projectWeekObj['cells']
    if(colouredCellList != {}){
        for (const [key, value] of Object.entries(colouredCellList)) {
            let element = document.querySelector(`[value="${key}"]`);
            element.style.background = value;
        }
    }
}

function dateGen(weekDict){
    let weekStartDate = weekDict['start_date'];
    let dateList = [weekStartDate];
    let day = parseInt(weekStartDate.split("/")[0]);
    let month = parseInt(weekStartDate.split("/")[1]);
    let year = parseInt(weekStartDate.split("/")[2]);
    
    for(let i = 0; i < 13; i++){
        day++;
        if(day > getMonth(month, year)){
            month++;
            day = 1;
        }
        let newDate = day.toString() + "/" + month.toString() + "/" + year.toString()
        dateList.push(newDate)
    }

    return dateList;
}

function timeGen(){
    let timeArr = ["Time|Date"];

    for (let hours = 0; hours < 24; hours++){
        for(let mins = 0; mins <= 45; mins += 15){
            let hourString = hours.toString();
            let minString = mins.toString();
            if(hours < 10){
                hourString = "0" + hours.toString();
            }
            if(mins == 0){
                minString = "00";
            }
            let newTime = hourString + ":" + minString;
            timeArr.push(newTime);
            
        }
    }
    Object.keys(colourMasterDict).forEach(function(key){
        timeArr.push(key);
    });

    timeArr.push("Total:");
    return timeArr;

}


function getMonth(month, year){
    if( month == 1){ //Jan
        return 31
    } else if(month == 2){ // Feb
        if(leapYear(year)){
            return 29
        } else {
            return 28
        }
    } else if(month == 3){ // Mar
        return 31
    } else if(month == 4){ // Apr
        return 30
    } else if(month == 5){ // May
        return 31
    } else if(month == 6){ // Jun
        return 30
    } else if(month == 7){ // Jul
        return 31
    } else if(month == 8){ // Aug
        return 31
    } else if(month == 9){ // Sep
        return 30
    } else if(month == 10){ // Oct
        return 31
    } else if(month == 11){ // Nov
        return 30
    } else if(month == 12){ // Dec
        return 31
    } else {
        return 30
    }

}

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}