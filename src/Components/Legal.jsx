import { Link } from "react-router-dom";
import "./legal.css";

export default function Legal() {
  return (
    <>
      <div className="legalDisclaimer">
        <div className="innerCard">
          <h2>LEGAL</h2>
          <div className="legal-paragraphs">
            <div className="legalText">
              <p>
                {" "}
                Fuel Lean Fitness respects your privacy and is committed to
                protecting your personal information. Any data collected through
                this website is used to improve user experience, provide fitness
                features, and manage accounts. We do not sell personal data to
                third parties.
              </p>
              <p>
                {" "}
                By using this website, you agree to use it responsibly and in
                compliance with applicable laws. You are responsible for
                maintaining the security of your account and any activity that
                occurs under it.
              </p>
              <p>
                {" "}
                All fitness, nutrition, and health-related information provided
                on this site is for general informational purposes only and is
                not medical advice, diagnosis, or treatment. You acknowledge
                that participation in exercise programs involves inherent risk,
                including but not limited to injury, and you agree that Fuel
                Lean Fitness is not responsible or liable for any injuries,
                health issues, or damages that may occur. Always consult a
                qualified healthcare professional before beginning any exercise,
                diet, or wellness program.
              </p>
              <p>
                {" "}
                We may update or change features, content, or policies at any
                time without notice. Continued use of the site means you accept
                any updated terms.
              </p>
              <p>
                {" "}
                All content, branding, and materials on this website are owned
                by Fuel Lean Fitness and may not be copied, reproduced, or
                distributed without permission.
              </p>
              <p>
                {" "}
                If you have any questions about these terms or policies, you can
                contact Fuel Lean Fitness through the support or contact section
                of the site.
              </p>
            </div>
          </div>
        </div>
        <div className="backHome">
          <Link to="/home">
            <p>HOME</p>
          </Link>
        </div>
      </div>
    </>
  );
}
