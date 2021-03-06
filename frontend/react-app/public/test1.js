var charles_commits = 0;
var chris_commits = 0;
var kevin_commits = 0;
var yijie_commits = 0;
var justin_commits = 0;
var unidentified_commits = 0;
var total_commits = 0;

var charles_issues = 0;
var chris_issues = 0;
var kevin_issues = 0;
var yijie_issues = 0;
var justin_issues = 0;
var unidentified_issues = 0;

var maxPg = 2;

for(let pg = 1; pg < 7; pg++) {
$.ajax(
  {
    url: "https://gitlab.com/api/v4/projects/7268012/repository/commits?page=" + pg + "&per_page=100&private_token=wYwwhFPaUQFis_Zj7_y1",
    async: true,
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    method: "GET"
  }).done(function(response)
    {
      //console.log(response);
      total_commits += response.length;
      for(var i in response)
      {
        var email = response[i].author_email;
        if(email == "charliematar@utexas.edu" || email == "cpm838@bitbucket.org")
          charles_commits++;
        else if(email == "amchris98@gmail.com" || email == "chris.amini0@gmail.com")
          chris_commits++;
        else if(email == "singhk7@yahoo.com")
          kevin_commits++;
        else if(email == "ytang2015@gmail.com")
          yijie_commits++;
        else if(email == "justinberman95@gmail.com")
          justin_commits++;
        else {
          console.log(email);
          unidentified_commits++;
        }
      }
      $("#charles_commits").html(charles_commits);
      $("#chris_commits").html(chris_commits);
      $("#kevin_commits").html(kevin_commits);
      $("#yijie_commits").html(yijie_commits);
      $("#justin_commits").html(justin_commits);
      $("#unidentified_commits").html(unidentified_commits);
      $("#total_commits").html(total_commits);
    });
}


$.ajax(
  {
    url: "https://gitlab.com/api/v4/projects/7268012/issues?page=1&per_page=1000&private_token=wYwwhFPaUQFis_Zj7_y1",
    async: true,
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    method: "GET"
  }).done(function(response)
    {
      $("#total_issues").html(response.length);
      for(var i in response)
      {
        var name = response[i].author.username;
        if(name == "CharlieM3")
          charles_issues++;
        else if(name == "chris.amini")
          chris_issues++;
        else if(name == "j-berman")
          justin_issues++;
        else if(name == "kevinsingh")
          kevin_issues++;
        else if(name == "ytang2015")
          yijie_issues++;
        else {
          console.log(name);
          unidentified_issues++;
        }
      }

      $("#charles_issues").html(charles_issues);
      $("#chris_issues").html(chris_issues);
      $("#justin_issues").html(justin_issues);
      $("#kevin_issues").html(kevin_issues);
      $("#yijie_issues").html(yijie_issues);
      $("#unidentified_issues").html(unidentified_issues);
  });

