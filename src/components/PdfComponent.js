import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import { FaLink } from "react-icons/fa";
import {
  HiLocationMarker,
  HiOfficeBuilding,
  HiOutlineMail,
  HiPhone,
} from "react-icons/hi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./PdfComponent.css";
import { PiCertificateFill } from "react-icons/pi";
import { useSelector } from "react-redux";

function PdfComponent() {
  const profile = useSelector((state) => state.profile);
  const name = profile.name;
  const file = useSelector((state) => state.file);
  const about = useSelector((state) => state.about);
  const experienceList = useSelector((state) => state.experienceList);
  const educationList = useSelector((state) => state.educationList);
  const certificateList = useSelector((state) => state.certificateList);
  const skills = useSelector((state) => state.skills);

  // const createAndDownloadPdf = () => {
  //   const data = {
  //     profile: profile,
  //     name: name,
  //     file: file,
  //     about: about,
  //     experienceList: experienceList,
  //     educationList: educationList,
  //     skills: skills,
  //   };
  //   axios
  //     .post("http://localhost:3000/create-pdf", data)
  //     .then(() =>
  //       axios.get("http://localhost:3000/fetch-pdf", { responseType: "blob" })
  //     )
  //     .then((res) => {
  //       const pdfBlob = new Blob([res.data], { type: "application/pdf" });

  //       saveAs(pdfBlob, "newPdf.pdf");
  //     });
  // };

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      // pdf.output('dataurlnewwindow');
      pdf.save(`${name}_Resume.pdf`);
    });
  };

  const GetIcon = (icon) => {
    switch (icon.icon) {
      case "HiOutlineMail":
        return <HiOutlineMail size={30} />;
      case "HiPhone":
        return <HiPhone size={30} />;
      case "BsLinkedin":
        return <BsLinkedin size={30} />;
      case "BsGithub":
        return <BsGithub size={30} />;
      case "BsGlobe":
        return <BsGlobe size={30} />;
      default:
        return "●";
    }
  };
  const GetLinks = () => {
    const list = [];
    if (profile.email) {
      list.push({
        icon: "HiOutlineMail",
        link: profile.email,
      });
    }
    if (profile.contact) {
      list.push({
        icon: "HiPhone",
        link: profile.contact,
      });
    }
    if (profile.linkedin) {
      list.push({
        icon: "BsLinkedin",
        link: profile.linkedin,
      });
    }
    if (profile.github) {
      list.push({
        icon: "BsGithub",
        link: profile.github,
      });
    }
    if (profile.website) {
      list.push({
        icon: "BsGlobe",
        link: profile.website,
      });
    }

    return list.map((item, id) => {
      return (
        <div
          className={`custom-list-item ${
            id % 2 === 0 ? "custom-bg-2" : "custom-bg-3"
          } custom-text-white custom-p-3`}
          key={id}
        >
          <p className="custom-m-0">
            <GetIcon icon={item.icon} />
          </p>
          <span className="custom-mx-2"></span>
          <p className="custom-m-0">{item.link}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="custom-button-container">
        <button className="custom-button" onClick={printDocument}>
          Download
        </button>
      </div>
      <div className="custom-container">
        <div className="conscroll">
          <div className="custom-row" id="divToPrint" size="A4">
            <div className="custom-columnn bg-1">
              <div className="">
                <div className="custom-profile">
                  <div className="custom-profile-image">
                    <img src={file} alt="Profile" />
                  </div>
                  <div className="custom-text-center">
                    <span className="custom-font-bold custom-mb-0 custom-firstname">
                      {name}
                    </span>
                    <br />
                    <p>{profile.tagline}</p>
                    <div style={{ display: "flex" }}>
                      <p
                        className="custom-mb-0"
                        style={{ paddingRight: "10px" }}
                      >
                        <HiOfficeBuilding size={20} /> {profile.position}
                      </p>
                      <p>
                        <HiLocationMarker size={20} /> {profile.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="custom-links">
                  <GetLinks />
                </div>
                <div className="custom-skills">
                  <h4 className="custom-title">Skills</h4>
                  <div className="custom-flex-wrap">
                    {skills.map((items, id) => (
                      <p className="custom-technology" key={id}>
                        {items}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-column">
              <div className="custom-content">
                <div className="custom-about">
                  <h4 className="custom-title">About Me</h4>
                  <hr className="custom-hr" />
                  <p className="custom-text-break">{about}</p>
                </div>
                <div className="custom-certificate">
                  <h4 className="custom-title">Certificate</h4>
                  <hr className="custom-hr" />
                  {certificateList.map((item, id) => (
                    <div className="custom-certificate-item" key={id}>
                      <PiCertificateFill size={40} />
                      <div className="custom-px-3">
                        <h4 className="custom-uppercase">{item.course}</h4>
                        <p className="custom-m-0 custom-capitalize">
                          {item.company}
                        </p>
                        <p>
                          <FaLink className="custom-link-icon" size={30} />
                          {item.link}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="custom-experience">
                  <h4 className="custom-title">Experience</h4>
                  <hr className="custom-hr" />
                  {experienceList.map((item, id) => (
                    <div className="custom-experience-item" key={id}>
                      <HiOfficeBuilding size={30} />
                      <div className="custom-px-3">
                        <h4>{item.title}</h4>
                        <p className="custom-m-0">
                          {item.company} • {item.startMonth} {item.startYear}{" "}
                          {`${
                            item.isWorking
                              ? " - Present"
                              : " - " + item.endMonth + " " + item.endYear
                          }`}
                        </p>
                        <p className="custom-m-0">{item.location}</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="custom-education">
                  <h4 className="custom-title">Education</h4>
                  <hr className="custom-hr" />
                  {educationList.map((item, id) => (
                    <div className="custom-education-item" key={id}>
                      <GiGraduateCap size={40} />
                      <div className="custom-px-3">
                        <h4>{item.institute}</h4>
                        <p className="custom-m-0">
                          {item.degree} • {item.fieldOfStudy}
                        </p>
                        <p>
                          {item.startYear} - {item.endYear} • Grade:{" "}
                          {item.grade}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfComponent;
