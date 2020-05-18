import React, { ChangeEvent } from "react";

const RealData = ({
	handleChange,
	realTeamInfo,
	realPlayerPhotos,
}: {
	handleChange: (
		name: string,
	) => (event: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
	realTeamInfo: string;
	realPlayerPhotos: string;
}) => {
	return (
		<>
			<h2>Team and Player Data for "Real Players" Leagues</h2>

			<p>
				By default, leagues using real players do not include real team names,
				team logos, or player photos. If you would like to override the defaults
				for any future league you create with real players, you can do that
				here.
			</p>
			<p>
				<a href="https://basketball-gm.com/manual/customization/team-player-data-real/">
					For more info, see the manual.
				</a>
			</p>

			<div className="row">
				<div className="col-sm-6 col-12 form-group">
					<label htmlFor="options-team-info">Team Info</label>
					<textarea
						id="options-team-info"
						className="form-control"
						onChange={handleChange("realTeamInfo")}
						value={realTeamInfo}
						rows={10}
					/>
				</div>
				<div className="col-sm-6 col-12 form-group">
					<label htmlFor="options-player-photos">Player Photos</label>
					<textarea
						id="options-player-photos"
						className="form-control"
						onChange={handleChange("realPlayerPhotos")}
						value={realPlayerPhotos}
						rows={10}
					/>
				</div>
			</div>
		</>
	);
};

export default RealData;