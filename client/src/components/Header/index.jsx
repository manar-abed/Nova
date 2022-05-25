import { Layout, Button, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { } from '@ant-design/icons';
import './style.css';
import headerImg from '../../assets/images/header.png';
import CreateInterviewButton from '../common/CreateInterviewButton';

const { Content } = Layout;
const { Title } = Typography;

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <Content
        className="site-layout-background headerContent"
      >
        <div className="allSec" id="home">
          <section className="rightSec">
            <div className="novaCommunity">
              <Title level={5} className="pNova">Nova Community</Title>
            </div>
            <Title level={1} className="PracticeMakesPerfect">Practice Makes Perfect</Title>
            <Title level={5} className="pDescribe">
              More than 2 billion people in over countries use Nova to
              practice with professional interviewer.
            </Title>
            {!user ? (
              <Button className="btnStartPracticing" type="primary">
                Start Practicing
              </Button>
            )
              : (
                <CreateInterviewButton
                  title="Book an Interview"
                />

              )}
            <Button className="btnAboutOurTeam" type="primary">
              About our Team
            </Button>
          </section>
          <section className="leftSec">
            <img className="headerImg" src={headerImg} alt="header" />
          </section>
        </div>
      </Content>
    </Layout>
  );
};
export default Header;
