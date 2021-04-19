import fb from "../firebase.js";

async function coinCal(x) {
    var taskList = await getList();
    return countAdvance(x, taskList);
}

function countAdvance(x, taskList) {
    var basicCoins = countBasic(x);
    var totalTR = 0;
    var i;
    for (i = 0; i < taskList.length; i++) {
        var item = taskList[i];
        var timeRatio = getTimeRatio(item.actualTime, item.breakTime, item.duration.hh, item.duration.mm);
        //console.log(timeRatio);
        totalTR += timeRatio;
    }
    var averageTR = totalTR / taskList.length;
    //console.log(averageTR);
    if (taskList.length < 10) {
        if (taskList.length >= 5) {
            if (averageTR < 0.8 || averageTR > 1.2) {
                return [basicCoins,averageTR,1];
            } else {
                return [basicCoins,averageTR,0];
            }
        } else {
            return [basicCoins,averageTR,0];
        }
    }
    if (averageTR < 0.8 || averageTR > 1.2) {
        return [getAdvanceCoin(basicCoins, averageTR),averageTR,2];
    } else {
        return [basicCoins,averageTR,0];
    }
}

function getTimeRatio(actualTime, breakTime, hh, mm) {
    var allocatedTime = (hh * 3600) + (mm * 60);
    var allocatedBreakTime = (allocatedTime / 1200) * 300
    var totalTime = 0;
    var allocatedTotal = 0;
    if (breakTime < allocatedBreakTime) {
        totalTime = actualTime;
        allocatedTotal = allocatedTime;
    } else {
        totalTime = actualTime + breakTime;
        allocatedTotal = allocatedTime + allocatedBreakTime;
    }
    return totalTime / allocatedTotal;
}

function getAdvanceCoin(x, averageTR) {
    if (averageTR < 0.9) {
        return Math.max(Math.floor(x * (averageTR - 0.1)),0);
    } else {
        return Math.max(Math.floor(x * ((1/averageTR) - 0.1)),0);
    }
}

function countBasic(x) {
    var numMins = x / 60;
    var numSetOfTen = Math.floor(numMins / 10);
    return numSetOfTen;
}

async function getList() {
    var taskList = [];
    var currentUser = fb.auth().currentUser;
    var uid = currentUser.uid;
    await fb.firestore()
      .collection("tasks")
      .doc(uid)
      .collection("tasksList")
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data().date);
            taskList.push(doc.data());
        });
    });
    taskList = taskList.filter(checkStatus);
    return taskList.slice(0,10);
}

function checkStatus(data) {
    return data.status == "Completed";
} 


export default coinCal;