import './scss/style.scss';
import 'bootstrap';
import $ from 'jquery';

// const convert = require('raw-guid-converter').convertRaw;

// develop
// const PORT = 8070;
// const SERVER = 'http://localhost';
// prod
const PORT = 8070;
const SERVER = 'http://ftp.dinternal.com.ua';


// const URL = `${SERVER}:${PORT}/api/register/`;
const URLClientUpdate = `${SERVER}:${PORT}/api/clients/update`;
// const URLlevels = `${SERVER}:${PORT}/api/get/levels`;
const URLlevelPrice = `${SERVER}:${PORT}/api/get/levels/id`;
// const URLgetOferta = `${SERVER}:${PORT}/api/clients/oferta`;
// const URLCenters = `${SERVER}:${PORT}/api/get/centers`;
// const URLClient = `${SERVER}:${PORT}/api/clients/`;
const URLContract = `${SERVER}:${PORT}/api/get/contract/id`;
const URLCities = `${SERVER}:${PORT}/api/get/cities`;
const URLGetEvents = `${SERVER}:${PORT}/api/events`;
const URLSendCertificate = `${SERVER}:${PORT}/api/certificate`;

// for testing localhost
// const URL = 'http://localhost:8000/api/register/';
// const URLlevels = 'http://localhost:8000/api/get/levels';
// const URLlevelPrice = 'http://localhost:8000/api/get/levels/id';
// const URLCenters = 'http://localhost:8000/api/get/centers';
// const URLCities = 'http://localhost:8000/api/get/cities';
// const URLContract = 'http://localhost:8000/api/get/contract/id';

// const getParamsUrl = (key) => {
//   // Get param string
//   const paramsString = window.location.search;
//   const params = new URLSearchParams(paramsString);
//   const strBase64 = params.get(key);
//   let decodedString;
//   let guidArr;
//   let guidStandard;
//   let sum;
//   let typeCamp;
//   let school;
//   let transfer;
//   let transferP;
//   const points = {
//     1: 'kpi-transfer-point',
//     2: 'pechersk-transfer-point',
//     3: 'livob-transfer-point',
//   };
//   if (strBase64) {
//     // Decode the String
//     decodedString = atob(strBase64);

//     // Split guid sum
//     guidArr = [
//       decodedString.slice(0, 8),
//       decodedString.slice(8, 12),
//       decodedString.slice(12, 16),
//       decodedString.slice(16, 20),
//       decodedString.slice(20, 32),
//     ];
//     guidStandard = guidArr.join('-').toUpperCase();
//     sum = decodedString.slice(32, 38);
//     sum = +sum;
//     console.log(`getParamsUrl sum: ${sum}`);
//     school = decodedString.slice(38, 39);
//     typeCamp = decodedString.slice(39, 40);
//     transfer = decodedString.slice(40, 41);
//     transferP = decodedString.slice(41, 42);
//     console.log(`${guidStandard}, ${sum}, ${school}, ${typeCamp}, ${transfer}`);
//   }
//   return (guidStandard && sum) ? {
//     guidStandard, sum, typeCamp, school, transfer, point: points[transferP],
//   }
//     : { guidStandard: false, sum: 0, typeCamp: 0 };
// };

// const setFieldsFromParams = (obj) => {
//   $('#guid').val(obj.guidStandard);
//   console.log(`sum after: ${obj.sum}`);
//   $('#sum').val(obj.sum);
//   console.log(`sum before: ${obj.sum}`);
//   $('#term').val(obj.typeCamp);
//   $('#school').val(obj.school);
//   if (obj.transfer) {
//     $('#yes-transfer').prop('checked', true);
//     $('.transfer-block').toggle();
//   } else { $('#no-transfer').prop('checked', true); }

//   $(`#${obj.point}`).prop('checked', true);
// };

// const setFieldsFromDataBase = (client) => {
//   // Set transfer buttons
//   if (client.Transfer) {
//     $('#yes-transfer').prop('checked', true);
//     $(`input[name=transferpoint][value='${client.TransferPoint}']`).prop('checked', true);
//     $('.transfer-block').toggle();
//   } else { $('#no-transfer').prop('checked', true); }
//   $('#guid').val(client.ClientId);
//   $('#namecyr').val(client.NameCyr);
//   $('#emailforinvoice').val(client.Email);
//   $('#sum').val(client.Sum);
//   $('#term').val(client.Term);
//   $('#school').val(client.School);
// };

// const setClient = (guid, linkValue, setFromDB, setFromLink) => {
//   let client;
//   $.ajax({
//     type: 'GET',
//     url: `${URLClient}${guid}`,
//   }).done((res) => {
//     console.log(typeof res);
//     if (res.ClientId) {
//       console.log(`${res.ClientId}`);
//       $('#oferta, .oferta-footer').attr('href', `../img/oferta-${res.Term}.pdf`);
//       setFromDB(res);
//     } else {
//       console.log('from params');
//       console.log(linkValue);
//       $('#oferta').attr('href', `../img/oferta-${linkValue.typeCamp}.pdf`);
//       setFromLink(linkValue);
//     }
//     // client = Object.assign(res);
//   }).fail((err) => {
//     client = false;
//     console.log('fail get client from DB: ', err);
//   });

//   return client;
// };


const updateContractContent = () => {

};

const setFormFields = () => {
  $('.close').click(() => {
    $('#no-user').removeClass('show');
  });
};

const hideElements = () => {
  $('#searchemail').hide();
};

const formInit = () => {
  setFormFields();
  hideElements();
  $('#typecode').prop('checked', true);

  $("input[name='searchtype']").change(() => {
    // console.log(search.currentTarget.value);
    $('#searchemail, #searchcode').toggle('fast');
  });

  $("input[name='transfer'], input[name='transferpoint']").click(() => false);

  $('#searchbyemail-btn, #searchbycode-btn').click(() => {
    const searchType = $("input[name='searchtype']:checked").val();
    const value = $(`#searchby${searchType}`).val();
    $('#no-user').removeClass('show');

    $.ajax({
      type: 'GET',
      url: `${URLGetEvents}/${searchType}/${value}`,
    }).done((events) => {
      if (events) {
        // clear table
        $('#table-result').html('<tr></tr>');
        for (let i = 0; i < events.length; i += 1) {
          $('#table-result').append(`<tr>
            <td> ${events[i].date} </td>
            <td> ${events[i].name} </td>
            <td> ${events[i].type} </td>            
            <td> ${events[i].speaker} </td>
            <td> <button class="btn btn-sm btn-success send" data-event="${events[i].ID}" data-user="${events[i].userID}">Відправити на E-mail</button> </td>
          </tr>`);
        }
        $('.send').click((e) => {
          const userID = e.currentTarget.getAttribute('data-user');
          const eventID = e.currentTarget.getAttribute('data-event');
          console.log(`${userID}, ${eventID}`);
          $.ajax({
            type: 'POST',
            url: URLSendCertificate,
            data: { userID, eventID },
          }).done((status) => {
            if (status === 'certificate has been sent') {
              $('#certificate-sent').addClass('show');
            } else {
              $('#certificate-not-sent').addClass('show');
            }
          }).fail(() => {
            $('#certificate-not-sent').addClass('show');
            console.log('have not sent email');
          });
        });
      } else {
        // clear table
        $('#table-result').html('<tr></tr>');
        $('#no-user').addClass('show');
      }
    });
  });

  $('#searchbyemail, #searchbycode').keypress((event) => {
    // если нажали ентер искать ивенты
    if (event.which === 13) {
      const searchType = $("input[name='searchtype']:checked").val();
      const value = $(`#searchby${searchType}`).val();
      $('#no-user').removeClass('show');

      $.ajax({
        type: 'GET',
        url: `${URLGetEvents}/${searchType}/${value}`,
      }).done((events) => {
        if (events) {
          // clear table
          $('#table-result').html('<tr></tr>');
          for (let i = 0; i < events.length; i += 1) {
            $('#table-result').append(`<tr>
              <td> ${events[i].date} </td>
              <td> ${events[i].name} </td>
              <td> ${events[i].type} </td>
              <td> ${events[i].speaker} </td>
              <td>
              <button class="btn btn-sm btn-success send"
                  data-event="${events[i].ID}" data-user="${events[i].userID}">
                  Відправити на E-mail
              </button>
              </td>
            </tr>`);
          }
          $('.send').click((e) => {
            const userID = e.currentTarget.getAttribute('data-user');
            const eventID = e.currentTarget.getAttribute('data-event');
            console.log(`${userID}, ${eventID}`);
            $.ajax({
              type: 'POST',
              url: URLSendCertificate,
              data: { userID, eventID },
            }).done((status) => {
              if (status === 'certificate has been sent') {
                $('#certificate-sent').addClass('show');
              } else {
                $('#certificate-not-sent').addClass('show');
              }
            });
          });
        } else {
          // clear table
          $('#table-result').html('<tr></tr>');
          $('#no-user').addClass('show');
        }
      });
    }
  });
};

// popover
$(() => {
  $('[data-toggle="popover"]').popover();
});
$('.popover-dismiss').popover({
  trigger: 'focus',
});

$('#citymore').click((e) => {
  $.ajax({
    type: 'POST',
    url: URLCities,
    data: {
      name: e.target.value,
    },
  }).done((res) => {
    const selectCenters = $('#centermore');
    selectCenters.empty();
    $(res).each((el) => {
      selectCenters.append($('<option>').attr('value', res[el].code).text(`${res[el].name} (${res[el].city})`));
    });
  }).fail((err) => {
    console.log(`fail get cities: ${err}`);
  });
});


$(document).ready(() => {
  formInit();

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  // eslint-disable-next-line no-unused-vars
  const validation = Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', (event) => {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // jquery ajax chain
  const getContractID = (levelID) => $.ajax({ type: 'POST', url: URLlevelPrice, data: { id: levelID } });
  const getContractContent = (level) => $.ajax({ type: 'POST', url: URLContract, data: { id: level.contract_id } });
  const updateInputContractForm = (ID) => {
    $('#contractmore').val(ID);
    $('#contractless').val(ID);
  };
  const pasteFullNameMore = () => {
    const name = $('#firstnamemore').val();
    const lastName = $('#lastnamemore').val();
    const temp = $('.contract').html().replace('IVANOV IVAN', `${name} ${lastName}`);
    $('.contract').html(temp);
  };
  const pasteFullNameLess = () => {
    const name = $('#firstnameless').val();
    const lastName = $('#lastnameless').val();
    const temp = $('.contract').html().replace('IVANOV IVAN', `${name} ${lastName}`);
    $('.contract').html(temp);
  };

  $('#levelmore').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLlevelPrice,
      data: {
        id: e.target.value,
      },
    }).done((res) => {
      getContractID(e.target.value)
        .then(getContractContent)
        .then(updateContractContent)
        .then(updateInputContractForm)
        .then(pasteFullNameMore);

      $('#costmore').val(res.price);
    }).fail((err) => {
      console.log(`fail get price: ${err}`);
    });
  });
  $('#levelless').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLlevelPrice,
      data: {
        id: e.target.value,
      },
    }).done((res) => {
      getContractID(e.target.value)
        .then(getContractContent)
        .then(updateContractContent)
        .then(updateInputContractForm)
        .then(pasteFullNameLess);

      $('#costless').val(res.price);
    }).fail((err) => {
      console.log(`fail get price: ${err}`);
    });
  });


  $('#cityless').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLCities,
      data: {
        name: e.target.value,
      },
    }).done((res) => {
      const selectCenters = $('#centerless');
      selectCenters.empty();
      $(res).each((el) => {
        selectCenters.append($('<option>').attr('value', res[el].code).text(`${res[el].name} (${res[el].city})`));
      });
    }).fail((err) => {
      console.log(`fail get cities: ${err}`);
    });
  });
}, false);


$('#form').submit((e) => {
  e.preventDefault(); // disallow form which refresh page
  e.stopPropagation();
  const form = $(e.currentTarget); // e.currentTarget use this instead for arrow function
  console.log(form.serialize());

  $.ajax({
    type: 'POST',
    url: URLClientUpdate,
    data: form.serialize(),
  }).done(() => {
    $('#success, #form, .notification').toggle();
  }).fail((err) => {
    console.log(`fail: ${err}`);
  });
  e.stopImmediatePropagation(); // dissalow send form twice
  return false;
});
