const buildForm = document.getElementById("buildForm");

buildForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // fetch all divs using querySelector
  const estateErr = document.querySelector(".estateErr");
  const locationErr = document.querySelector(".locationErr");
  const amountErr = document.querySelector(".amountErr");
  const land_sizeErr = document.querySelector(".land_sizeErr");  
  const phone_noErr = document.querySelector(".phone_noErr");
  const emailErr = document.querySelector(".emailErr");
  const descriptionErr = document.querySelector(".descriptionErr");
  const land_imgErr = document.querySelector(".land_imgErr");
  const plan_imgErr = document.querySelector(".plan_imgErr");



  // Clear previous errors
  estateErr.innerHTML = "";
  locationErr.innerHTML = "";
  amountErr.innerHTML = "";
  land_sizeErr.innerHTML = "";
  phone_noErr.innerHTML = "";
  emailErr.innerHTML = "";
  descriptionErr.innerHTML = "";
  land_imgErr.innerHTML = "";
  plan_imgErr.innerHTML = "";

  
 
  const estate_name = buildForm.estate_name.value;
  const location = buildForm.location.value;
  const amount = buildForm.amount.value.replace(/,/g, '');
  const land_size = buildForm.land_size.value.replace(/,/g, '');
  const phone_no = buildForm.phone_no.value;
  const email = buildForm.email.value;
  const description = buildForm.description.value;
  const land_img = buildForm.land_img;
  const plan_img = buildForm.plan_img;
  const buildId = buildForm.buildId.value;

  // Regex for validation
  const estate_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const locationReg = /^[a-zA-Z0-9\s,'-]+$/;
  const amountReg = /^[0-9]+$/;
  const phone_noReg = /^[0-9]+$/;
  const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
  const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;

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

  if (!amountReg.test(land_size)) {
    land_sizeErr.innerHTML = "Land size is required";
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

  if (!descriptionReg.test(description)) {
    descriptionErr.innerHTML = "Description is required";
    return;
  }

  if (land_img.files.length == 0) {
    land_imgErr.innerHTML = "Upload the land image";
    return;
  }

  if (plan_img.files.length == 0) {
    plan_imgErr.innerHTML = "Upload the building plan image";
    return;
  }

  // Creating form data
  const formData = new FormData();

  formData.append("estate_name", estate_name);
  formData.append("location", location);
  formData.append("amount", amount);
  formData.append("land_size", land_size);
  formData.append("phone_no", phone_no);
  formData.append("email", email);
  formData.append("description", description);
  formData.append("land_img", land_img.files[0]);
  formData.append("plan_img", plan_img.files[0]);
  formData.append("buildId", buildId);

  // Submitting the form using fetch
  fetch("/edit-build", {
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
