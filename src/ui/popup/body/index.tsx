import SettingsSection from "@components/settings/settings-section";

const Body = () => (
    <body>
        <div className="application-main">
            <main>
                <div className="container-lg p-responsive clearfix">
                    <div className="d-flex flex-md-row flex-column px-md-0 px-3">
                        <div className="col-md-9 col-12 mb-3">
                            <SettingsSection />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </body>
);

export default Body;