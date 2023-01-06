$(document).ready(function () {

    function findDevice() {
        if ($(window).width()>900) {
            return "desktop";
        }else if($(window).width() <= 900 & $(window).width()> 500 ) {
            return "tablet"
        }
        else {
            return "phone";
        }
    }

    let apiResponse = [];


    $(window).resize(function(){
        buildgallery(apiResponse);
      });

    $.ajax({
        url: "https://api.unsplash.com/photos?page=1&client_id=7ch6lPKKXlvun0jlFKP_lz1QT4rEq7U78ti-rt9pM7Y",
        success: function(response) {
            apiResponse = response;
            buildgallery(apiResponse);
        },
        error: function(xhr) {
            //Do Something to handle error
        }
    });

    function buildgallery(response){
        // console.log(response);

        let device = findDevice();

        console.log(device);

        let subContainer1 = $("#subContainer1");
        subContainer1.html("");
        subContainer1.css("display", "block");

        let subContainer2 = $("#subContainer2");
        subContainer2.html("");
        subContainer2.css("display", "block");
            
        let subContainer3 = $("#subContainer3");
        subContainer3.html("");
        subContainer3.css("display", "block");


        let lastPhotoId = response.length -1;

        let photoJSON = {};

        for (var i=0 ;i< response.length;i++){
            // console.log(response[i]);

            photoJSON[i]=response[i].urls.full;
        
        let itemsContainer = $("<div></div>").addClass("item-container");
        let imgItemContainer = $("<div></div>").addClass("img-item-container");
        let imgItem = $("<img>").attr({
            src: response[i].urls.full, 
            class:"img-item img-items-content",
            sourceId: i
        });
        let imgOverlayContainer = $("<div></div>").addClass("img-overlay-container");
        let imgOverlayItems = $("<div></div>").addClass("img-overlay-items");
        let imgOverlayimgContent = $("<div></div>").addClass("img-overlay-img-content");
        let iconImg = $("<img>").attr({
            src: response[i].urls.thumb, 
            class:"img-item icon-img border-radius-icon-img"
        });
        let overlayInfoText = $("<div></div>").addClass("overlay-info-text");
        let headingTitle = $("<h3></h3>").addClass("text-info").text(response[i].user.first_name);
        let subInfoText = $("<p></p>").addClass("text-info").text(response[i].user.bio);
        let itemDetails = $("<div></div>").addClass("item-details");
        let itemTextContent1 = $("<div></div>").addClass("item-text-content");
        let itemTextInfo1 = $("<div></div>").addClass("item-info").text(response[i].user.social.instagram_username);
        let itemTextContent2 = $("<div></div>").addClass("item-text-content");
        let itemTextInfo2 = $("<div></div>").addClass("item-info").text(response[i].user.social.twitter_username);

        if(device == "desktop") {
            if(parseInt(parseInt(i)+1)  % 3 == 1) {
                let main = subContainer1.append(itemsContainer.append(imgItemContainer.append(imgItem).append(imgOverlayContainer.append(imgOverlayItems.append(imgOverlayimgContent.append(iconImg)).append(overlayInfoText.append(headingTitle).append(subInfoText))))).append(itemDetails.append(itemTextContent1.append(itemTextInfo1)).append(itemTextContent2.append(itemTextInfo2)) ) ) ;
            }else if(parseInt(parseInt(i)+1) % 3 == 2) {
                let main = subContainer2.append(itemsContainer.append(imgItemContainer.append(imgItem).append(imgOverlayContainer.append(imgOverlayItems.append(imgOverlayimgContent.append(iconImg)).append(overlayInfoText.append(headingTitle).append(subInfoText))))).append(itemDetails.append(itemTextContent1.append(itemTextInfo1)).append(itemTextContent2.append(itemTextInfo2)) ) ) ;
            }else {
                let main = subContainer3.append(itemsContainer.append(imgItemContainer.append(imgItem).append(imgOverlayContainer.append(imgOverlayItems.append(imgOverlayimgContent.append(iconImg)).append(overlayInfoText.append(headingTitle).append(subInfoText))))).append(itemDetails.append(itemTextContent1.append(itemTextInfo1)).append(itemTextContent2.append(itemTextInfo2)) ) ) ;
            }
        }else if(device == "tablet") {
            if(parseInt(parseInt(i)+1)  % 2 == 1) {
                let main = subContainer1.append(itemsContainer.append(imgItemContainer.append(imgItem).append(imgOverlayContainer.append(imgOverlayItems.append(imgOverlayimgContent.append(iconImg)).append(overlayInfoText.append(headingTitle).append(subInfoText))))).append(itemDetails.append(itemTextContent1.append(itemTextInfo1)).append(itemTextContent2.append(itemTextInfo2)) ) ) ;
            }else {
                let main = subContainer2.append(itemsContainer.append(imgItemContainer.append(imgItem).append(imgOverlayContainer.append(imgOverlayItems.append(imgOverlayimgContent.append(iconImg)).append(overlayInfoText.append(headingTitle).append(subInfoText))))).append(itemDetails.append(itemTextContent1.append(itemTextInfo1)).append(itemTextContent2.append(itemTextInfo2)) ) ) ;
            }
            subContainer3.css("display", "none");
        }else {
            let main = subContainer1.append(itemsContainer.append(imgItemContainer.append(imgItem).append(imgOverlayContainer.append(imgOverlayItems.append(imgOverlayimgContent.append(iconImg)).append(overlayInfoText.append(headingTitle).append(subInfoText))))).append(itemDetails.append(itemTextContent1.append(itemTextInfo1)).append(itemTextContent2.append(itemTextInfo2)) ) ) ;
            subContainer2.css("display", "none");
            subContainer3.css("display", "none");
        }

        

        // console.log(main);

        }


        let prevPhotoId = lastPhotoId;
        let nextPhotoId = 0;

        $(".img-items-content").click(function (event) {
            $(".popup-container").show();
            
            let currentPhotoId = parseInt(event.target.attributes.sourceid.value);

            openPopupPhoto(currentPhotoId);
            
            console.log(prevPhotoId, currentPhotoId, nextPhotoId);
        });
    
        $("#popup-close-btn").click(function () {
            $(".popup-container").hide();
        });



        $("#preview-img-btn").click(function() {
            console.log(prevPhotoId);
            let currentPhotoId = prevPhotoId;

            openPopupPhoto(currentPhotoId);

            
        })

        $("#next-img-btn").click(function() {
            console.log(nextPhotoId);

            let currentPhotoId = nextPhotoId;
            openPopupPhoto(currentPhotoId);
            
        })

        function openPopupPhoto(currentPhotoId) {

            $("#popup-img").attr("src", photoJSON[currentPhotoId]);

            if(currentPhotoId > 0) {
                prevPhotoId = currentPhotoId -1;
            }else{
                prevPhotoId = lastPhotoId;
            }

            if(currentPhotoId != lastPhotoId) {
                nextPhotoId = currentPhotoId +1;
            }else {
                nextPhotoId = 0;
            }
        }


    }




    
});