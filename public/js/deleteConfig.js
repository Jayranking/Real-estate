function deletePost(post_id) {
    console.log(post_id);

    // console.log(post_id);
    if (post_id === '') {
        $(document).ready(() => {
            iziToast.error({
                title: 'Error',
                message: 'Invalid Data',
            });
        }) 
    }
    const data = { post_id }
    fetch('/delete-post', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            $(document).ready(() => {
                iziToast.success({
                    title: 'Ok',
                    message: data.msg,
                });
            });

            setInterval(() => {
                window.location.href = data.redirectURL;
            }, 2000);
        }
        if (data.error) {
            // Invoke the toast component
            $(document).ready(() => {
                iziToast.error({
                    title: 'Error',
                    message: data.error,
                });
            });
        }
    })
    .catch(e => {
    })
}