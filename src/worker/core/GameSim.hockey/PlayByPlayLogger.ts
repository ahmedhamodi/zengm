import type { TeamNum } from "./types";

type PlayByPlayEventInputScore = {
	type: "goal";
	clock: number;
	t: TeamNum;
	names: [string];
};

type PlayByPlayEventInput =
	| {
			type: "quarter" | "overtime";
			quarter: number;
			clock: number;
	  }
	| {
			type: "gameOver";
			clock: number;
	  }
	| {
			type: "injury";
			clock: number;
			t: TeamNum;
			names: [string];
			injuredPID: number;
	  }
	| {
			type: "hit" | "faceoff";
			clock: number;
			t: TeamNum;
			names: [string, string];
	  }
	| {
			type:
				| "gv"
				| "tk"
				| "slapshot"
				| "wristshot"
				| "shot"
				| "block"
				| "miss"
				| "save"
				| "save-freeze";
			clock: number;
			t: TeamNum;
			names: [string];
	  }
	| PlayByPlayEventInputScore
	| {
			type: "offensiveLineChange" | "fullLineChange" | "defensiveLineChange";
			clock: number;
			t: TeamNum;
	  };

export type PlayByPlayEvent = (
	| PlayByPlayEventInput
	| {
			type: "stat";
			t: TeamNum;
			pid: number | undefined | null;
			s: string;
			amt: number;
	  }
) & {
	quarter: number;
};

export type PlayByPlayEventScore = PlayByPlayEventInputScore & {
	quarter: number;
};

class PlayByPlayLogger {
	active: boolean;

	playByPlay: PlayByPlayEvent[];

	scoringSummary: PlayByPlayEventScore[];

	quarter: number;

	constructor(active: boolean) {
		this.active = active;
		this.playByPlay = [];
		this.scoringSummary = [];
		this.quarter = 1;
	}

	logEvent(event: PlayByPlayEventInput) {
		if (event.type === "quarter") {
			this.quarter = event.quarter;
		} else if (event.type === "overtime") {
			this.quarter += 1;
		}

		const event2: PlayByPlayEvent = {
			quarter: this.quarter,
			...event,
		};

		this.playByPlay.push(event2);

		if (event2.type === "goal") {
			this.scoringSummary.push(event2);
		}
	}

	logStat(t: TeamNum, pid: number | undefined | null, s: string, amt: number) {
		if (!this.active) {
			return;
		}

		this.playByPlay.push({
			type: "stat",
			quarter: this.quarter,
			t,
			pid,
			s,
			amt,
		});
	}

	getPlayByPlay(boxScore: any) {
		if (!this.active) {
			return;
		}

		return [
			{
				type: "init",
				boxScore,
			},
			...this.playByPlay,
		];
	}
}

export default PlayByPlayLogger;
