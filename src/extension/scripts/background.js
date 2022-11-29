(() => {
    window.addEventListener('DOMContentLoaded', () => {
        const problem_number = document.location.href;
        const p = problem_number.split('/');
        if(p.length == 5 && p[3] == 'problem' && !isNaN(p[4])) {
            var update = () => {
                fetch(`https://0.0.0.0:8989/problem/${problemId}`)
                    .then((response) => response.json())
                    .then((data) => document.getElementById('custom_add_problem').innerHTML = data.data == 1 ? '추가됨' : '추가')
            };
            const problem_title = document.getElementById('problem_title').innerText;
            let problemId = p[4];

            var add_problem_btn = document.createElement('span');
            add_problem_btn.className = 'btn problem-label problem-label-ac'
            add_problem_btn.setAttribute('id', 'custom_add_problem')
            add_problem_btn.onclick = () => {
                fetch(`https://0.0.0.0:8989/add_problem/${problemId}`)
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => update())
            };
            var add_problem_btnText = document.createTextNode('추가');
            add_problem_btn.appendChild(add_problem_btnText);
            document.getElementsByClassName('page-header')[0].getElementsByTagName('h1')[0].appendChild(add_problem_btn);

            var remove_problem_btn = document.createElement('span');
            remove_problem_btn.className = 'btn problem-label problem-label-wa'
            remove_problem_btn.setAttribute('id', 'custom_remove_problem')
            remove_problem_btn.onclick = () => {
                fetch(`https://0.0.0.0:8989/remove_problem/${problemId}`)
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => update())
            };
            var remove_problem_btnText = document.createTextNode('제거');
            remove_problem_btn.appendChild(remove_problem_btnText);
            document.getElementsByClassName('page-header')[0].getElementsByTagName('h1')[0].appendChild(remove_problem_btn);
            update();
        }
    });
})();