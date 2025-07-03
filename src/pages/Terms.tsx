import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4 py-8">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-primary mb-4 text-center">
            Terms and Conditions
          </h1>
          <div className="text-gray-700 dark:text-gray-300 space-y-6 text-left max-w-2xl">
            <section>
              <h2 className="text-2xl font-bold mb-2 text-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Book Library application, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-2 text-primary">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Book Library’s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on Book Library’s website</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-2 text-primary">3. Disclaimer</h2>
              <p>
                The materials on Book Library’s website are provided on an 'as is' basis. Book Library makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-2 text-primary">4. Limitations</h2>
              <p>
                In no event shall Book Library or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Book Library’s website.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-2 text-primary">5. Modifications</h2>
              <p>
                Book Library may revise these Terms and Conditions at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-2 text-primary">6. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-2 text-primary">7. Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us via the Contact page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;