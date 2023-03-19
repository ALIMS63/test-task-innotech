import { FC, useEffect, useState, ChangeEvent } from 'react';
import { Input } from './components/Input';
import { Dropdown } from './components/Dropdown';
import GlobalStyle from './globalStyles';
import {
    Container,
    ContentWrapper,
    FromToArrow,
    InnerBlock,
    Title, Page
} from './styled';


const App: FC = () => {
    const [fromSum, setFromSum] = useState<string>('');
    const [toSum, setToSum] = useState<string>('');

    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toCurrency, setToCurrency] = useState<string>('');

    const [rates, setRates] = useState<string[]>([]);

    const getData = async () => {
        try {
            const response = await fetch("https://api.exchangerate.host/latest");
            const json = await response.json();
            console.log('json:', json);
            setFromCurrency(json.base);
            setRates(Object.keys(json.rates));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const intervalCall = setInterval(() => {
          getData();
        }, 60000); // Каждую минуту выполняем новый запрос на обновление данных
        return () => {
          clearInterval(intervalCall);
        };
      }, []);

    return (
        <>
            <GlobalStyle />
            <Page>
                <Container>
                    <Title>Конвертация</Title>
                    <ContentWrapper>
                        <InnerBlock>
                            <Dropdown
                                placeholder="Исходная валюта не выбрана"
                                options={rates}
                                selectedOption={fromCurrency}
                                setSelectedOption={(value: string) => setFromCurrency(value)}
                            />
                            <Input
                                required
                                placeholder="0.0"
                                name="fromSum"
                                value={
                                    fromSum.split('.').length > 1
                                           ? `${fromSum.split('.')[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')}.${fromSum.split('.')[1]
                                           }`
                                           : `${fromSum.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}`
                                }
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value.replaceAll(',', '').replace(/[^\d.-]+/g, '');
                                    if (value.length > 1 && value[0] === '0') return;
                                    setFromSum(value);
                                  }}
                            />
                        </InnerBlock>

                        <FromToArrow />

                        <InnerBlock>
                            <Dropdown
                                placeholder="Валюта конвертации не выбрана"
                                options={rates}
                                selectedOption={toCurrency}
                                setSelectedOption={(val: string) => setToCurrency(val)}
                            />
                            <Input
                                required
                                placeholder='0.0'
                                name="toSum"
                                value={
                                    toSum.split('.').length > 1
                                           ? `${toSum.split('.')[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')}.${toSum.split('.')[1]
                                           }`
                                           : `${toSum.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}`
                               }
                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                   const value = e.target.value.replaceAll(',', '').replace(/[^\d.-]+/g, '');
                                   setFromSum('');
                                   if (value.length > 1 && value[0] === '0') return;
                                   setToSum(value);
                                 }}
                            />
                        </InnerBlock>
                    </ContentWrapper>
                </Container>
            </Page>
        </>
    );
};

export default App;
