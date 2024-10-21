const buyForm = document.getElementById("buyForm");

buyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // fetch all divs using querySelector
  const estateErr = document.querySelector(".estateErr");
  const locationErr = document.querySelector(".locationErr");
  const amountErr = document.querySelector(".amountErr"); 
  const descriptionErr = document.querySelector(".descriptionErr");
  const phone_noErr = document.querySelector(".phone_noErr");
  const emailErr = document.querySelector(".emailErr");
  const bedroomErr = document.querySelector(".bedroomErr");
  const sitting_roomErr = document.querySelector(".sitting_roomErr");
  const kitchenErr = document.querySelector(".kitchenErr");
  const toiletErr = document.querySelector(".toiletErr");
  const imageErr = document.querySelector(".imageErr");



  // Clear previous errors
  estateErr.innerHTML = "";
  locationErr.innerHTML = "";
  amountErr.innerHTML = "";
  descriptionErr.innerHTML = "";
  phone_noErr.innerHTML = "";
  emailErr.innerHTML = "";
  bedroomErr.innerHTML = "";
  sitting_roomErr.innerHTML = "";
  kitchenErr.innerHTML = "";
  toiletErr.innerHTML = "";
  imageErr.innerHTML = "";
 
  const estate_name = buyForm.estate_name.value;
  const location = buyForm.location.value;
  const amount = buyForm.amount.value.replace(/,/g, '');
  const description = buyForm.description.value;
  const phone_no = buyForm.phone_no.value;
  const email = buyForm.email.value;
  const bedroom = buyForm.bedroom.value;
  const sitting_room = buyForm.sitting_room.value;
  const kitchen = buyForm.kitchen.value;
  const toilet = buyForm.toilet.value;
  const img = buyForm.img;
  const buyId = buyForm.buyId.value;


  // Regex for validation
  const estate_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const locationReg = /^[a-zA-Z0-9\s,'-]+$/;
  const amountReg = /^[0-9]+$/;
  const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;
  const phone_noReg = /^[0-9]+$/;
  const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;

  // Validation checks
  if (!estate_nameReg.test(estate_name)) {
    estateErr.innerHTML = "Estate name is required";
    return;
  }

  if (!locationReg.test(location)) {
    locationErr.innerHTML = "Location is required";
    return;
  }

  if (!amountReg.test(amount)) {
    amountErr.innerHTML = "Amount is required";
    return;
  }

  if (!descriptionReg.test(description)) {
    descriptionErr.innerHTML = "Description is required";
    return;
  }

  if (!phone_noReg.test(phone_no)) {
    phone_noErr.innerHTML = "Phone number is required";
    return;
  }

  if (!emailReg.test(email)) {
    emailErr.innerHTML = "Email is required";
    return;
  }

  if (!amountReg.test(bedroom)) {
    bedroomErr.innerHTML = "Enter number of bedroom";
    return;
  }

  if (!amountReg.test(sitting_room)) {
    sitting_roomErr.innerHTML = "Enter number of sitting room";
    return;
  }

  if (!amountReg.test(kitchen)) {
    kitchenErr.innerHTML = "Enter number of kitchen";
    return;
  }

  if (!amountReg.test(toilet)) {
    toiletErr.innerHTML = "Enter number of toilet";
    return;
  }

  if (img.files.length == 0) {
    imageErr.innerHTML = "Upload the bulding image";
    return;
  }

  // Creating form data
  const formData = new FormData();

  formData.append("estate_name", estate_name);
  formData.append("location", location);
  formData.append("amount", amount);
  formData.append("description", description);
  formData.append("phone_no", phone_no);
  formData.append("email", email);
  formData.append("bedroom", bedroom);
  formData.append("sitting_room", sitting_room);
  formData.append("kitchen", kitchen);
  formData.append("toilet", toilet);
  formData.append("img", img.files[0]);
  formData.append("buyId", buyId);

  // Submitting the form using fetch
  fetch("/edit-buy", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        $(document).ready(() => {
          iziToast.success({
            title: "Ok",
            message: data.msg,
          });
        });

        setTimeout(() => {
          window.location.href = data.redirectURL;
        }, 2000);
      }
      if (data.error) {
        $(document).ready(() => {
          iziToast.error({
            title: "Error",
            message: data.error,
          });
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});
