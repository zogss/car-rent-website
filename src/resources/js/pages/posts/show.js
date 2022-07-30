import Swal from "sweetalert2";

const ShowPage = () => ({
  deletePost(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const form = document.createElement("form")
        form.action = `/posts/${id}?_method=DELETE`
        form.method = "POST"
        document.body.appendChild(form)
        form.submit()
      }
    });
  },
});

export default ShowPage;
