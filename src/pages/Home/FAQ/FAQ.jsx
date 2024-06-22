/* eslint-disable react/no-unescaped-entities */

const FAQ = () => {
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
                    <p className="mt-4 mb-8 dark:text-gray-600">Sagittis tempor donec id vestibulum viverra. Neque condimentum primis orci at lacus amet bibendum.</p>
                    <div className="space-y-4">
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-default-600">How do I get support or suggest a feature for the SurveyHaven API?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Reach out to our team for help or feedback by visiting our contact page. </p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-default-600">What is a survey?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">A survey gathers information or feedback from individuals to understand their opinions,
                            preferences, or experiences on a particular topic or subject.  </p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-default-600">How do I revoke an access token?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">You can refresh your app's credential in the settings for your app in the developer portal. This will refresh your secret, revoking all access to your app. </p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;