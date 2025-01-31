import { toHumanReadableDate } from "@Utils/helpers/toHumanReadableDate"
import { Fragment } from "react"
import styled from "styled-components"
import colors from "@Colors"

import { useViewportDimensions } from "@Hooks/useViewportDimensions"
import { header2, paragraph } from "@Styles/typography"
import { FirebaseStorageResolver } from "@Components/shared/FirebaseStorageResolver"

interface Props {
	/** Optionally display the game without any of it's meta information. */
	noText?: true
	/** Is the game currently active on the platform? If not, it will show as coming soon. */
	active: boolean
	/** What is this game's name? */
	displayName: string
	/** Cover art for the game. */
	titleImage: string
	/** Studio that developed this game. */
	developer: string
	/** Genres that this game belongs to. */
	genres: string[]
	/** Platforms that this game can be played on. */
	platforms: string[]
	/** The original release date for the game. */
	releaseDate: Date
	/** Name of the game translated into a version that is safe for URIs. */
	urlSafeName: string
	/** Optional function to run when the card is clicked. */
	onClick?: (...args: any) => any
}

/** Display a game's cover art along with it's meta information. Meta info can be optionally disabled. */
export const GameCard = ({
	noText,
	active,
	displayName,
	urlSafeName,
	titleImage,
	developer,
	genres,
	platforms,
	releaseDate,
	onClick
}: Props) => {
	const { width } = useViewportDimensions()

	return (
		<FirebaseStorageResolver
			path={titleImage}
			noSpinner
			render={(img) => (
				<Container onClick={onClick} active={active} titleImage={img} data-cy={`${urlSafeName}-button`}>
					{(width as number) > 550 && (
						<ImageContainer>
							<img src={img} alt={displayName} style={{ width: "100%" }} />
						</ImageContainer>
					)}

					{!noText && (
						<MetaInfo>
							<H2>{displayName}</H2>
							<div>
								<Paragraph>{developer}</Paragraph>
								<Paragraph>
									{genres.map((elem, index) => {
										return <Fragment key={elem}>{index === genres.length - 1 ? `${elem}` : `${elem}, `}</Fragment>
									})}
								</Paragraph>
								<Paragraph>
									{platforms.map((elem, index) => {
										return <Fragment key={elem}>{index === platforms.length - 1 ? `${elem}` : `${elem}, `}</Fragment>
									})}
								</Paragraph>
								<Paragraph>Released {toHumanReadableDate(releaseDate)}</Paragraph>
							</div>
						</MetaInfo>
					)}

					{!active && (
						<>
							<ComingSoon>
								<p style={{ cursor: "default" }}>COMING</p>
								<p style={{ cursor: "default" }}>SOON</p>
							</ComingSoon>
						</>
					)}
				</Container>
			)}
		/>
	)
}

export default GameCard

// Styled Components

const Container = styled.div<{ active: boolean; titleImage: string }>`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	min-width: 280px;
	width: 80%;
	max-width: 500px;
	height: 300px;
	margin: 12px auto;
	padding: 28px 48px;
	border-radius: 10px;
	background: ${colors.darker};
	${paragraph};
	color: ${colors.white};
	cursor: ${(props) => (props.active ? "pointer" : "initial")};
	transition: 0.2s;

	&:hover {
		transform: ${(props) => (!!props.onClick ? "scale(1.01)" : "initial")};
	}

	@media (max-width: 550px) {
		background: linear-gradient(
				to right,
				rgba(23, 23, 24, 0) 0%,
				rgba(23, 23, 24, 0.8) 20%,
				rgba(23, 23, 24, 1) 50%,
				rgba(23, 23, 24, 1) 100%
			),
			url("${(props) => props.titleImage}"), ${colors.light};
		background-repeat: no-repeat;
		background-size: auto 100%;
	}
`

const ImageContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 175px;
	height: 100%;
	border-radius: 5px;
	overflow: hidden;
	text-align: center;
`

const MetaInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-around;
	height: 100%;
	padding-left: 32px;
`

const H2 = styled.h2`
	color: ${colors.white};
	${header2};
	text-align: right;
`

const Paragraph = styled.p`
	margin: 4px 0;
	text-align: right;
`

const ComingSoon = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #252525c5;
	color: #ffffff81;
	font-weight: 600;
	font-size: 22px;
	border-radius: 10px;
`
