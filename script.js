const serverList = [];


var serverSelected = null;
var updateLocalStorage = [];

function updateTables() {
    let tablebody = document.getElementById("tablebody");
    let content = "";
    serverList.forEach(element => {
        content += `<tr onclick="onSelectServer('${element.name}', '${element.players}', '${element.status}', '${element.rank}', '${element.ip}')">
                        <td>${element.name}</td>
                        <td>${element.players}</td>
                        <td class="${element.status == "Online" ? "greentext" : "redtext"}">${element.status}</td>
                    </tr>`;
    });
    tablebody.innerHTML = content;
}


function onSelectServer(name, players, status, rank, ip) {
    let pname = document.getElementById("servername");
    let pplayers = document.getElementById("playercount");
    let pserverstatus = document.getElementById("serverstatus");
    let pserverrank = document.getElementById("serverrank");
    let pserverip = document.getElementById("serverip");


    pname.innerHTML = name;
    pplayers.innerHTML = players;
    pserverstatus.innerHTML = status;
    pserverrank.innerHTML = rank;
    pserverip.innerHTML = ip;

    onChangeAside(rank)
}


function onChangeAside(rank) {
    let asidecheck = window.getComputedStyle(document.getElementById("aside-bar")).display;
    let changeAside = document.getElementById("aside-bar");
    let changeImg = document.getElementById("img-aside");


    // style.display = "block";
    // console.log('asidecheck ' + asidecheck)
    if (rank == serverSelected) {
        changeAside.style.display = "none";
        changeImg.style.display = "block";
        serverSelected = null;
        return
    }

    if (asidecheck == "none") {
        changeAside.style.display = "block";
        changeImg.style.display = "none";
    }

    serverSelected = rank;

}


function deleteServer() {

    let marked = serverSelected - 1
    // serverList.splice(marked, marked)
    delete serverList[marked]
    updateTables()

    let t1 = localStorage.getItem('servers').split(',')


    t1.splice(marked * 5, 5);

    localStorage.setItem('servers', t1.join(','))
    onChangeAside(serverSelected)
    if (localStorage.getItem('servers') !== null) {
    }
    if(t1[0] === undefined){
        localStorage.removeItem('servers')
        updateTables()
    }
    // console.log(t1)
    console.log(serverList)
}






function showModal(edit = false) {
    let modal = document.getElementById("addmodal");
    if (edit == false) {
        let rank = document.getElementById("addRank");
        rank.value = serverList.length + 1;
    }
    else {
        let modaltitle = document.getElementById("modaltitle");
        let addbutton = document.getElementById("addBtn")
        let closemodal = document.getElementById("close");
        modaltitle.innerText = "Edit a server in the list";
        addbutton.innerText = "APPLY"
        addbutton.setAttribute("onclick", "applyChange()")
        closemodal.setAttribute("onclick", "hideModal(edit=true)")

        let iname = document.getElementById("addName");
        let icount = document.getElementById("addCount");
        // let istatus = document.getElementById("addStatus");
        let irank = document.getElementById("addRank");
        let iip = document.getElementById("addIP");

        iname.value = `${serverList[serverSelected - 1]["name"]}`;
        icount.value = `${serverList[serverSelected - 1]["players"]}`;
        // istatus.value = `${serverList[serverSelected-1]["status"]}`;
        irank.value = `${serverList[serverSelected - 1]["rank"]}`;
        iip.value = `${serverList[serverSelected - 1]["ip"]}`;
    }
    modal.style.display = "flex";
}


function hideModal(edit = false) {
    let iname = document.getElementById("addName");
    let icount = document.getElementById("addCount");
    let irank = document.getElementById("addRank");
    let iip = document.getElementById("addIP");

    let modal = document.getElementById("addmodal");
    if (edit == false) {
        modal.style.display = "none";
    }
    else {
        let modaltitle = document.getElementById("modaltitle");
        let addbutton = document.getElementById("addBtn");
        modaltitle.innerText = "Add a new server to the list";
        addbutton.innerText = "ADD SERVER";
        addbutton.setAttribute("onclick", "addServer()");

        iname.value = ""
        icount.value = ""
        irank.value = ""
        iip.value = ""


        modal.style.display = "none";
    }
}


function addServer(num_storage = false) {

    if (num_storage === false) {
        let iname = document.getElementById("addName");
        let icount = document.getElementById("addCount");
        let istatus = document.getElementById("addStatus");
        let irank = document.getElementById("addRank");
        let iip = document.getElementById("addIP");

        if (iname.value.length > 4 && icount.value.length > 4 && iip.value.length > 4) {
            istatus = istatus.checked === true ? "Online" : "Offline"
            serverList.push({
                name: iname.value,
                players: icount.value,
                status: istatus,
                rank: irank.value,
                ip: iip.value
            })

            updateLocalStorage.push(
                iname.value,
                icount.value,
                istatus,
                irank.value,
                iip.value
            )
            localStorage.setItem('servers', updateLocalStorage);
            console.log(updateLocalStorage);
            hideModal();
            updateTables();
            // if (localStorage.getItem('servers') !== null) {
            //     alert('não vazio')
            // }
        }
        else {
            if (irank.value < 1) {
                alert("Server rank can't be less than 1")
            }
            else if (irank.value <= serverList.length) {
                alert("This server rank already exist.");
            } else if (irank.value > serverList.length + 1) {
                alert(`Your are skipping the rank ${serverList.length + 1}`);
            }
            else
                alert('5 characters minimum')
        }
    }
    else {
        // let t1 = localStorage.getItem('servers').split(',');
        // for (let index = 0; index < t1.length/5; index++) {
        //     const element = t1[index];
        //     let actual = t1.splice(index, 5);
        //     console.log(`Agora: index:${index} t1: ${t1}`);
        // }
        //
        let t1 = localStorage.getItem('servers').split(',');

        for (let index = 0; index < t1.length; index += 5) {
            const actual = t1.slice(index, index + 5);
            serverList.push({
                name: actual[0],
                players: actual[1],
                status: actual[2],
                rank: Number(actual[3]),
                ip: actual[4]
            })
        }
        // let j = 0;
        // for (let i = 1; i < (t1.length / 5) + 1; i++, j += 5) {
        //     let actual = t1.slice(j, i * 5)
            // serverList.push({
            //     name: actual[0],
            //     players: actual[1],
            //     status: actual[2],
            //     rank: Number(actual[3]),
            //     ip: actual[4]
            // })
        // }
    }
}


function editServer() {
    showModal(edit = true)
    console.log('hellow')
}


function applyChange() {
    console.log(serverSelected)

    let marked = serverSelected - 1

    let iname = document.getElementById("addName");
    let icount = document.getElementById("addCount");
    let istatus = document.getElementById("addStatus");
    let irank = document.getElementById("addRank");
    let iip = document.getElementById("addIP");

    if (iname.value.length > 4 && icount.value.length > 4 && iip.value.length > 4) {
        istatus = istatus.checked === true ? "Online" : "Offline"
        serverList[marked] = {
            name: iname.value,
            players: icount.value,
            status: istatus,
            rank: irank.value,
            ip: iip.value
        }

        let t1 = localStorage.getItem('servers').split(',')



        t1[marked * 5] = iname.value
        t1[marked * 5 + 1] = icount.value
        t1[marked * 5 + 2] = istatus
        t1[marked * 5 + 3] = irank.value
        t1[marked * 5 + 4] = iip.value


        localStorage.setItem('servers', t1.join(','))

        // updateLocalStorage.push(
        //     iname.value,
        //     icount.value,
        //     istatus,
        //     irank.value,
        //     iip.value
        // )
        // localStorage.setItem('servers', updateLocalStorage);
        console.log(updateLocalStorage);
        hideModal();
        updateTables();
        if (localStorage.getItem('servers') !== null) {
            alert('não vazio')
        }
    }
    else {
        if (iname.value.length < 5) {
            alert("Server name has less than 5 characters")
        }
        else if (icount.value.length < 5) {
            alert("Players count has less than 5 characters")
        }
        else if (iip.value.length > 4) {
            alert("IP Adress has less than 5 characters")
        }
    }

}



if (localStorage.getItem('servers') === null) {
    serverList.push({
        name: "RustReborn.gg EU - Bedwars", players: "619/650", status: "Online", rank: "1", ip: "eu.rustreborn.gg:28015"
    },
        {
            name: "Rustoria.co - EU Main", players: "184/250", status: "Online", rank: "2", ip: "main.rustoria.uk:28015"
        },
        {
            name: "Rustoria.co - US Medium", players: "212/225", status: "Online", rank: "3", ip: "208.103.169.113:28015"
        },
        {
            name: "Rustoria.co - US Main", players: "0/250", status: "Offline", rank: "4", ip: "vanilla.rustoria.us:28015"
        })
    let numm = 0;
    serverList.forEach(element => {
        updateLocalStorage.push(
            element.name,
            element.players,
            element.status,
            element.rank,
            element.ip
        )
    });
    localStorage.setItem('servers', updateLocalStorage);
}
else {
    console.log('pass')
    addServer(num_storage = true)
    updateLocalStorage = localStorage.getItem('servers').split(',')

    // console.log('-------------------------SERVERLIST----------------------------')
    // console.log(serverList)
    // console.log('------------------------LOCALSTORAGE---------------------------')
    // console.log(localStorage.getItem('servers'))
    // console.log('---------------------------SPLIT-(ATUAL)-----------------------')
    // console.log(updateLocalStorage)
    // console.log('---------------------------JOIN--------------------------------')
    // console.log(updateLocalStorage.join(','))
    // console.log('---------------------------------------------------------------')
}


updateTables()

